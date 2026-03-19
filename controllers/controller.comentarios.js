const pool = require("../db");

exports.obtenerComentario=async(req,res)=>{
    try{
        const result =await pool.query("SELECT * FROM comentario")
        res.json(result.rows)
    }catch(err){console.error("error al obtener los comentarios",err)
        res.status(500).send("error de bases de datos")
    }
}

exports.agregarComentario=async(req,res)=>{
    const {id_usuario,id_post,comentario_post}= req.body;
    try{
        const result =await pool.query("INSERT INTO comentario (id_usuario,id_post,comentario_post) values($1,$2,$3) returning * ",[id_usuario,id_post,comentario_post])
        res.json(result.rows)
    }catch(err){console.error("error al agregar el usuario",err)}

}

exports.modificarComentario=async(req,res)=> {
    const {id} = req.params;
    const {comentario_post} = req.body;
    try{
        const result = await pool.query("UPDATE comentario SET comentario_post=$1 WHERE id=$2",[comentario_post,id])
    res.json(result.rows)
    }catch(err){console.err(`error al modificar el usuario ${id}`,err)}
}

exports.eliminarComentario=async(req,res)=> {
    const {id}=req.params
    try{
        await pool.query("DELETE FROM comentario WHERE id=$1",[id])
        res.json("usuario eliminado")
    }catch(err){console.error("error al eliminar el usuario")}
}