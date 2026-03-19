const express = require("express");
const router = express.Router();
const comentarios = require("../controllers/controller.comentarios");

router.get("/",comentarios.obtenerComentario )

router.post("/",comentarios.agregarComentario)

router.put("/:id",comentarios.modificarComentario)

router.delete("/:id",comentarios.eliminarComentario)

module.exports = router