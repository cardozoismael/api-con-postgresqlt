const express=require("express")
const router=express.Router()
const pool =require("../db")

//obtener posts
router.get("/", async(req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM posts")
        res.json(result.rows)
    }catch(err){
        console.error("error en la consulta",err)
        res.status(500).send("error en la bases de datos")
    }
})
//agregar post

router.post("/",async(req,res)=>{
    const {usuario_id,comentario}= req.body
    try{
        const result = await pool.query("INSERT INTO posts (usuario_id,comentario) values($1,$2) returning *",[usuario_id,comentario])
        res.json(result.rows)
    }catch(err){console.error("error al insertar ",err)}
    res.status(500).send("error en la bases de datos")
})

//modicar post
router.put("/:id", async(req,res)=>{
    const {id} = req.params
    const {comentario}=req.body
    try{
        const result = await pool.query("UPDATE posts SET comentario=$1 WHERE id=$2 returning *",[comentario,id])
        res.json(result.rows[0])
    }catch(err){
        console.error("error al modificar comentario",err)
    }
})

//eliminar
router.delete("/:id", async(req,res)=>{
    const {id}= req.params;
    try{
        await pool.query("DELETE FROM posts WHERE id=$1",[id])
    res.send(`usuario eliminado ${id}`)
    }catch(err){`error al eliminar el usuario ${id}`,err}
})

module.exports=router