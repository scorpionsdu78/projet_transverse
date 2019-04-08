const config = require("./assets/config")

const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./assets/swagger.json")
const mysql = require("promise-mysql");
const bodyParser = require("body-parser")

const expressOasGenerator = require('express-oas-generator');
const morgan = require("morgan")("dev")

const Utilisateur = require("./assets/classes/Utilisateur")
const Adresse_utilisateur = require("./assets/classes/Adresse_utilisateur")
const Adresse = require("./assets/classes/Adresse")
const Photo = require("./assets/classes/Photo")
const Tag = require("./assets/classes/Tag")
const Tag_couleur = require("./assets/classes/Tag_couleur")


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
        let UtilisateurRouter = express.Router()
        const utilisateur = new Utilisateur(db)


        UtilisateurRouter.route(`/:id`)

            .get( async (req, res) => {

                const result = await utilisateur.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })

            .put( async (req, res) => {

                const result = await utilisateur.update(req.params.id, req.body.mot_de_passe, req.body.new_mot_de_passe, req.body.adresse_mail, req.body.instagram, req.body.avatar, req.body.description)
                res.json( checkAndChange(result) )

            })
            
            .delete( async (req, res) => {

                const result = await utilisateur.delete(req.params.id)
                res.json( checkAndChange(result) )
                
            })


        UtilisateurRouter.route(`/admin/id/:id`)

            .get( async (req, res) => {

                const result = await utilisateur.getByID_admin(req.params.id)             
                res.json( checkAndChange(result) )
                
            })



        UtilisateurRouter.route(`/`)

            .get( async (req, res) => {

                const result = await utilisateur.getAll()
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await utilisateur.add(req.body.nom_utilisateur, req.body.mot_de_passe, req.body.adresse_mail, req.body.instagram, req.body.avatar, req.body.description)
                res.json(checkAndChange(result))

            })


        UtilisateurRouter.route(`/admin/all`)

            .get( async (req, res) => {

                const result = await utilisateur.getAll_admin()             
                res.json( checkAndChange(result) )
                
            })


        //Adresse d'utilisateur :
        let AdresseUtilisateurRouter = express.Router()
        const adresse_utilisateur = new Adresse_utilisateur(db)


        AdresseUtilisateurRouter.route(`/`)
        
            .post( async (req, res) => {

                const result = await adresse_utilisateur.add(req.body.id_utilisateur, req.body.id_adresse)
                res.json(checkAndChange(result))

            })


        AdresseUtilisateurRouter.route(`/admin`)
        
            .post( async (req, res) => {

                const result = await adresse_utilisateur.add_admin(req.body.id_utilisateur, req.body.id_adresse)
                res.json(checkAndChange(result))

            })


        AdresseUtilisateurRouter.route(`/:id`)

            .get( async (req, res) => {

                const result = await adresse_utilisateur.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })

            .delete( async (req, res) => {

                const result = await adresse_utilisateur.delete(req.params.id)             
                res.json( checkAndChange(result) )
                
            })


        AdresseUtilisateurRouter.route(`/admin/:id`)

            .get( async (req, res) => {

                const result = await adresse_utilisateur.getByID_admin(req.params.id)             
                res.json( checkAndChange(result) )
                
            })


        AdresseUtilisateurRouter.route(`/utilisateur/:id`)

            .get( async (req, res) => {

                const result = await adresse_utilisateur.getByUtilisateur(req.params.id)
                res.json(checkAndChange(result))

            })


        AdresseUtilisateurRouter.route(`/admin/utilisateur/:id`)

            .get( async (req, res) => {

                const result = await adresse_utilisateur.getByUtilisateur_admin(req.params.id)
                res.json(checkAndChange(result))

            })


        //Adresse :
        let AdresseRouter = express.Router()
        const adresse = new Adresse(db)


        AdresseRouter.route(`/:id`)

            .get( async (req, res) => {

                const result = await adresse.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })
            
            .delete( async (req, res) => {

                const result = await adresse.delete(req.params.id)
                res.json( checkAndChange(result) )
                
            })


        AdresseRouter.route(`/admin/:id`)

            .get( async (req, res) => {

                const result = await adresse.getByID_admin(req.params.id)             
                res.json( checkAndChange(result) )
                
            })



        AdresseRouter.route(`/`)
            
            .post( async (req, res) => {

                const result = await adresse.add(req.body.pays, req.body.code_postal, req.body.rue, req.body.numero, req.body.indications, req.body.masquage)
                res.json(checkAndChange(result))

            })



        AdresseRouter.route(`/admin`)
            
            .post( async (req, res) => {

                const result = await adresse.add_admin(req.body.pays, req.body.code_postal, req.body.rue, req.body.numero, req.body.indications, req.body.masquage)
                res.json(checkAndChange(result))

            })



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

                const result = await photo.delete(req.params.id)
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




        //Tag :
        let TagRouter = express.Router()
        const tag = new Tag(db)


        TagRouter.route(`/:id`)

            .get( async (req, res) => {

                const result = await tag.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })
            
            .delete( async (req, res) => {

                const result = await tag.delete(req.params.id)
                res.json( checkAndChange(result) )
                
            })



        TagRouter.route(`/`)

            .get( async (req, res) => {

                const result = await tag.getAll(req.query.oeuvre)
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await tag.add(req.body.tag, req.body.id_oeuvre)
                res.json(checkAndChange(result))

            })

            
        //Tag couleur :
        let TagCouleurRouter = express.Router()
        const tag_couleur = new Tag_couleur(db)


        TagCouleurRouter.route(`/:id`)

            .get( async (req, res) => {

                const result = await tag_couleur.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })
            
            .delete( async (req, res) => {

                const result = await tag_couleur.delete(req.params.id)
                res.json( checkAndChange(result) )
                
            })



        TagCouleurRouter.route(`/`)

            .get( async (req, res) => {

                const result = await tag_couleur.getAll(req.query.oeuvre)
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await tag_couleur.add(req.body.tag, req.body.id_oeuvre)
                res.json(checkAndChange(result))

            })




        //Initialisation des Routers
        app.use(config.rootAPI + `Utilisateur`, UtilisateurRouter)
        app.use(config.rootAPI + `Adresse-utilisateur`, AdresseUtilisateurRouter)
        app.use(config.rootAPI + `Adresse`, AdresseRouter)
        app.use(config.rootAPI + `Photo`, PhotoRouter)
        app.use(config.rootAPI + `Tag`, TagRouter)
        app.use(config.rootAPI + `Tag-couleur`, TagCouleurRouter)



        //Démarrage de notre serveur
        app.listen(config.port, () => console.log(`Server started on port ${config.port}`))
    })
    .catch( (err) => console.error(err.message))
