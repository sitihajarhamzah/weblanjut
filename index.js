const { PrismaClient } = require("@prisma/client")
const express = require("express")
const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.get("/api", async (req,res) => {
    try {
        const{jenis_barang}=req.query
        if(jenis_barang==null){
            return res.status(400).send("jenis barang yang anda cari tidak tersedia")
        }console.log(jenis_barang,nama_barang)
        const data = await prisma.jasatitip.findMany({where : {
            jenis_barang : {
                contains : jenis_barang
            }
        }})
    }catch(err){
        console.log(err)
        return res.status(500)
    }
})
app.post("/api", async (req, res) => {
    try {
        console.log(req.body)
        const data = await prisma.jasatitip.create({
            data: req.body
        })
        return res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return res.status(500).send("Error")
    }

})
app.put("/api/:id", async (req, res) => {
    try {
        const data = await prisma.jasatitip.update({ where : {id_barang: parseInt(req.params.id_barang)}, data : req.body })
        return res.status(200).json(data)
    }catch(err) {
        console.log(err)
        return res.status(500).send("Error")
    }
})
app.delete("/api/:id", async (req,res) => {
    try {
        
        const data = await prisma.jasatitip.delete({where : {id_barang : parseInt(req.params.id_barang)}})
        return res.status(200).json(data)

    }catch(err) {
        console.log(err)
        return res.status(500).send("Server Error")
    }
})


app.listen(4000, () => {
    console.log("Server berjalan di http://localhost:4000")
})