const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")
const twig = require("twig")

const morgan = require("morgan")("dev")




//variables globales :
const app = express()
const port = 8081
const fetch = axios.create({
    baseURL : "http://localhost:8080/api/v1"
})
const TestesRouter = express.Router()




//Middlewares :
app.use(morgan)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))




//Routes :
app.get("/", (req, res) => {
    res.redirect("/testes")
})


TestesRouter.route("/")

    .get((req, res) => {

        apiCall("/members", "get", {}, res, (response) => {
            res.render("testes/panel_admin.twig", {
                members : response
            })
        })

    })




//Création de nos routes :
app.use(`/testes`, TestesRouter)


//Lancement de l'app
app.listen(port, () => console.log(`Server started on port : ${port}`))



//Functions :
function renderError(res, errMes){
    res.render("error.twig", {
        errorMessage : errMes
    })
}


function apiCall(url, method, data, res, next){

    fetch({
        method : method,
        url : url,
        data : data
    })
        .then( (response) => {
            if(response.data.status == "error")
                renderError(res, response.data.message)


            else
                next(response.data.result)
        })
        .catch( (err) => renderError(res, err.message) )

}

