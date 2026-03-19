const express=require("express")
const router =express.Router()
const usuarios = require("../controllers/controller.usuario")

router.get("/",usuarios.obtenerUsuario)
router.post("/",usuarios.agregarUsuario)
router.put("/:id",usuarios.modificarUsuario)
router.delete("/:id",usuarios.eliminarUsuario)

module.exports= router