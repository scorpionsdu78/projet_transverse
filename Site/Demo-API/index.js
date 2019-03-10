const config = require("./assets/config")

const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./assets/swagger.json")
const mysql = require("promise-mysql");
const bodyParser = require("body-parser")
const morgan = require("morgan")("dev")

const Members = require("./assets/classes/members_class")(config)


const {checkAndChange} = require("./assets/functions")


mysql.createConnection(config.db)
    .then( (db) => {
        console.log("Connection to the DB established !")


        const app = express()
        let MemberRouter = express.Router()
        const members = new Members(db)


        app.use(config.rootAPI + "api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
        app.use(morgan)
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended : true
        }))



        MemberRouter.route(`/:id`)

            .get( async (req, res) => {

                const result = await members.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })

            .put( async (req, res) => {

                const result = await members.update(req.params.id, req.body.name)
                res.json( checkAndChange(result) )

            })
            
            .delete( async (req, res) => {

                const result = await members.delete(req.params.id, req.body.name)
                res.json( checkAndChange(result) )
                
            })



        MemberRouter.route(`/`)

            .get( async (req, res) => {

                const result = await members.getAll(req.query.max)
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await members.add(req.body.name)
                res.json(checkAndChange(result))

            })




        app.use(config.rootAPI + `members`, MemberRouter)




        app.listen(config.port, () => console.log(`Server started on port ${config.port}`))
    })
    .catch( (err) => console.error(err.message))
