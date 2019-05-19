const fs =require("fs")
const express = require("express")
const bodyParser = require("body-parser")
var session = require('express-session')
const twig = require("twig")
//const fileUpload = require('express-fileupload');
const morgan = require("morgan")("dev")
const multer = require('multer');
const upload = require("express-fileupload");
const http = require("http")

const Site_router = require("./routes/Site_router.js")
const Panel_admin_router = require("./routes/Panel_admin_router.js")
const Tests_router = require("./routes/Tests_router.js")



//variables globales :
const app = express()
const port = 8081




//Middlewares :
app.use(morgan)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))    
app.use(express.static("public"));
app.use(upload());
app.use(session({
    secret: "OANI-SESSION-",
    resave: false,
    saveUninitialized: true
}));




//Routes :

//Webapp
let site_router = new Site_router()

//Panel admin
let panel_admin_router = new Panel_admin_router()


//tests
let tests_router = new Tests_router()


//Création de nos routes :
app.use(``, site_router)
app.use(`/panel_admin`, panel_admin_router)
app.use(`/tests`, tests_router)


//Lancement de l'app
http.Server(app).listen(port, () => console.log(`Server started on port ${port}`))
//app.listen(port, () => console.log(`Server started on port : ${port}`))



//Functions :
