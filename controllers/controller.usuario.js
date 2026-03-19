const pool =require("../db")
const bcrypt = require("bcrypt")

exports.obtenerUsuario =async (req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM usuarios")
        res.status(200).json(result.rows)
    }catch (err){
        console.error(err)
        res.status(500).json({message:"error al obtener los datos"})
    }
}

exports.agregarUsuario = async (req,res)=>{
    const {nombre,email,contraseña} = req.body;
    if(!nombre||!email ||!contraseña)return res.status(400).json({message:"datos requeridos"})
    try{
        const asaltAround = 10
        const contraseñaHasheada = await bcrypt.hash(contraseña,asaltAround)
        const result= await pool.query("INSERT INTO usuarios (nombre,email,contraseña) values ($1,$2,$3) returning *",[nombre,email,contraseñaHasheada]);
        res.status(200).json(result.rows[0])
        }catch(err){
        console.error(err)
        res.status(500).json({message:"error al agregar usuario"})
        }
    }

exports.modificarUsuario = async (req,res)=>{
    const {id}= req.params;
    const {nombre,email,contraseña} = req.body;
    if(!nombre|| !email || !contraseña)return res.status(400).json({message:"datos requeridos para modificar"})
    try{
        const asaltAround= 10;
        const nuevacontraseñaHasheada = await bcrypt.hash(contraseña,asaltAround)
        const result =await pool.query("UPDATE usuarios SET nombre=$1,email=$2,contraseña=$3 WHERE id=$4 RETURNING *",[nombre,email,nuevacontraseñaHasheada,id])
        res.status(200).json(result.rows[0])
    }catch(err){
        console.error(err)
        res.status(500).json({message:"error al modificar el usuario"})
    }
}

exports.eliminarUsuario =async (req,res)=>{
    const {id} = req.params;
    try{
        await pool.query("DELETE FROM usuarios WHERE id=$1",[id])
        res.status(200).json({message:"usuario fue eliminado exitosamente",data:usuario})
    }catch(err){
        console.error(err)
        res.status(500).json({message:"error al eliminar usuario"})
    }
}

/** agregar verificacion si esta el usuario en la bases de datos ,sino tirar error . */