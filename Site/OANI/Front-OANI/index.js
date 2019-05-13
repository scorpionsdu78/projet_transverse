const fs =require("fs")
const express = require("express")
const bodyParser = require("body-parser")
const twig = require("twig")
//const fileUpload = require('express-fileupload');
const morgan = require("morgan")("dev")
const multer = require('multer');
const upload = require("express-fileupload");
const http = require("http")
const Panel_admin_router = require("./routes/Panel_admin_router.js")



//variables globales :
const app = express()
const port = 8081




//Middlewares :
app.use(morgan)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))    
app.use(express.static("public"));
app.use(upload());




//Routes :

//Panel admin
let panel_admin_router = new Panel_admin_router()


//Création de nos routes :
app.use(`/panel_admin`, panel_admin_router)


//Lancement de l'app
http.Server(app).listen(port, () => console.log(`Server started on port ${port}`))
//app.listen(port, () => console.log(`Server started on port : ${port}`))



//Functions :
