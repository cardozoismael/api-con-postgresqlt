const express = require("express");
const app = express();
const PORT = 3000;
const helmet =require("helmet");

app.use(express.json())
app.use(
    helmet.contentSecurityPolicy({
        directives:{
            defaultsrc:["'self'"],
            connectsrc:["'self'","http:localhost:3000"],
        },
    })
)
//usuarios
const usuariosRutas =require("./rutas/usuarios")
app.use("/usuario",usuariosRutas);

//posts
const postsRutas =require("./rutas/posts") 
app.use("/posts",postsRutas)

//delete
const comentarioRutas = require("./rutas/comentario");
app.use("/comentarios",comentarioRutas)

app.listen(PORT,()=>{console.log(`servidor escuchando en el puerto ${PORT}`)})