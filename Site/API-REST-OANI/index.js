const config = require("./assets/config")

const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./assets/swagger.json")
const mysql = require("promise-mysql");
const bodyParser = require("body-parser")

const expressOasGenerator = require('express-oas-generator');
const morgan = require("morgan")("dev")

const Utilisateur = require("./assets/classes/Utilisateur")
const Photo = require("./assets/classes/Photo")


const {checkAndChange} = require("./assets/functions")


//Connection à la database
mysql.createConnection(config.db)
    .then( (db) => {
        //Connection établie
        console.log("Connection to the DB established !")


        //Initialisation de notre serveur
        const app = express()
        expressOasGenerator.init(app, {})


        //Middlewares :
        app.use(config.rootAPI + "api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
        app.use(morgan)
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended : true
        }))


        //Utilisateur :
        /*let UserRouter = express.Router()
        const user = new Utilisateur(db)


        UserRouter.route(`/:id`)

            .get( async (req, res) => {

                const result = await user.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })

            .put( async (req, res) => {

                const result = await user.update(req.params.id, req.body.name)
                res.json( checkAndChange(result) )

            })
            
            .delete( async (req, res) => {

                const result = await user.delete(req.params.id, req.body.name)
                res.json( checkAndChange(result) )
                
            })



        UserRouter.route(`/`)

            .get( async (req, res) => {

                const result = await user.getAll(req.query.max)
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await user.add(req.body.name)
                res.json(checkAndChange(result))

            })*/



        //Photo :
        let PhotoRouter = express.Router()
        const photo = new Photo(db)


        PhotoRouter.route(`/:id`)

            .get( async (req, res) => {

                const result = await photo.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })

            .put( async (req, res) => {

                const result = await photo.update(req.params.id, req.body.ordre)
                res.json( checkAndChange(result) )

            })
            
            .delete( async (req, res) => {

                const result = await photo.delete(req.params.id, req.body.name)
                res.json( checkAndChange(result) )
                
            })



        PhotoRouter.route(`/`)

            .get( async (req, res) => {

                const result = await photo.getAll(req.query.oeuvre)
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await photo.add(req.body.id_oeuvre, req.body.ordre, req.body.name)
                res.json(checkAndChange(result))

            })




        //Initialisation des Routers
        //app.use(config.rootAPI + `Utilisateur`, UserRouter)
        app.use(config.rootAPI + `Photo`, PhotoRouter)



        //Démarrage de notre serveur
        app.listen(config.port, () => console.log(`Server started on port ${config.port}`))
    })
    .catch( (err) => console.error(err.message))
