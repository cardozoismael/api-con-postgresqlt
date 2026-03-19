const pool =require("../db")

exports.obtenerPosts=async(req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM posts")
        res.json(result.rows)
    }catch(err){
        console.error("error en la consulta",err)
        res.status(500).send("error en la bases de datos")
    }
}

exports.agregarPosts=async(req,res)=>{
    const {usuario_id,comentario}= req.body
    try{
        const result = await pool.query("INSERT INTO posts (usuario_id,comentario) values($1,$2) returning *",[usuario_id,comentario])
        res.json(result.rows)
    }catch(err){console.error("error al insertar ",err)}
    res.status(500).send("error en la bases de datos")
}

exports.modificarPosts=async(req,res)=>{
    const {id} = req.params
    const {comentario}=req.body
    try{
        const result = await pool.query("UPDATE posts SET comentario=$1 WHERE id=$2 returning *",[comentario,id])
        res.json(result.rows[0])
    }catch(err){
        console.error("error al modificar comentario",err)
    }
}

exports.eliminarPosts=async(req,res)=>{
    const {id}= req.params;
    try{
        await pool.query("DELETE FROM posts WHERE id=$1",[id])
    res.send(`usuario eliminado ${id}`)
    }catch(err){`error al eliminar el usuario ${id}`,err}
}



