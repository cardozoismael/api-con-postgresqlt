const morgan = require("morgan");
const express = require("express");
const helmet =require("helmet");

const app = express();
app.use(express.json())
app.use(helmet())
app.use(morgan("dev"))


//usuarios
const usuariosRutas =require("./ruters/usuarios")
app.use("/usuario",usuariosRutas);

//posts
const postsRutas =require("./ruters/posts") 
app.use("/posts",postsRutas)

//comentariosDeLosPostsRutas
const comentarioRutas = require("./ruters/comentario");
app.use("/comentarios",comentarioRutas)


const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{console.log(`servidor escuchando en el puerto ${PORT}`)})