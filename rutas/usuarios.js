const express=require("express")
const router =express.Router()
const pool =require("../db")

router.get("/",async (req,res)=>{
    try{
        const result = await pool.query("SELECT * FROM usuarios")
        res.json(result.rows)
    }catch (err){
        console.error("error en la consulta: ",err)
        res.status(500).send("error en la bases de datos")
    }
})
//agregar usuario
router.post("/",async (req,res)=>{
    const {nombre,email} = req.body;
    try{
        const result= await pool.query(
            "INSERT INTO usuarios (nombre,email) values ($1,$2) returning *",[nombre,email]
        );
        res.json(result.rows[0])
        }catch(err){
            console.error(err)
        res.status(500).send("error al agregar usuario")
        }
    }
)
//actualizar usuario

router.put("/:id", async (req,res)=>{
    const {id}= req.params;
    const {nombre,email} = req.body;
    try{
        const result =await pool.query(
            "UPDATE usuarios SET nombre=$1 , email=$2 WHERE id=$3 RETURNING *",[nombre,email,id]
        )
        res.json(result.rows[0])
    }catch(err){
        console.error(err)
        res.status(500).send("error al modificar el usuario")
    }
})
//eliminar usuario

router.delete("/:id", async (req,res)=>{
    const {id} = req.params;
    try{
        await pool.query(
        "DELETE FROM usuarios WHERE id=$1",[id]
        )
        res.send(`usuario con id ${id} fue eliminado`)
    }catch(err){
        console.error(err)
        res.status(500).send("error al eliminar usuario")
    }
}
)

module.exports= router