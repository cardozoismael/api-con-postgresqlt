const express=require("express")
const router=express.Router()
const posts = require("../controllers/controller.posts")

router.get("/",posts.obtenerPosts)
router.post("/",posts.agregarPosts)
router.put("/:id",posts.modificarPosts)
router.delete("/:id",posts.eliminarPosts)

module.exports=router