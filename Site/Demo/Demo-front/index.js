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
const MemberRouter = express.Router()




//Middlewares :
app.use(morgan)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))




//Routes :
app.get("/", (req, res) => {
    res.redirect("/members")
})


MemberRouter.route("/")

    .get((req, res) => {

        const url = "/members" +(req.query.max ? "?max=" + req.query.max : "")

        apiCall(url, "get", {}, res, (response) => {
            res.render("members.twig", {
                members : response
            })
        })

    })


    MemberRouter.route("/get/:id")
        
        .get( (req, res) => {
    
            apiCall("/members/" + req.params.id, "get", {}, res, (response) => {
                res.render("member.twig", {
                    member : response
                })
            })
    
        })
    
    
    MemberRouter.route("/edit/:id")
    
        .get( (req, res) => {
    
            apiCall("/members/" + req.params.id, "get", {}, res, (response) => {
                res.render("edit.twig", {
                    member : response
                })
            })
    
        })
    
        .post( (req, res) => {
            
            apiCall("/members/" + req.params.id, "put", {
                name : req.body.name 
            }, res, () => {
                res.redirect("/members")
            })
    
        })
    
    
    MemberRouter.route("/delete")
    
        .post( (req, res) => {
            
            apiCall("/members/" + req.body.id, "delete", {}, res, () => {
                res.redirect("/members")
            })
    
        })
    
    
    MemberRouter.route("/insert")
    
        .get( (req, res) => {
            console.log("jsuilà")
            
            res.render("insert.twig")

        })
    
        .post( (req, res) => {
            console.log("jsuilà")
            
            apiCall("/members/", "post", {name : req.body.name}, res, (response) => {
                res.redirect("/members/get/" + response.id)
            })
    
        })




//Création de nos routes :
app.use(`/members`, MemberRouter)


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

