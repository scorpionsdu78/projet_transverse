const config = require("./assets/config")

const express = require("express")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./assets/swagger.json")
const mysql = require("promise-mysql");
const bodyParser = require("body-parser")

const expressOasGenerator = require('express-oas-generator');
const morgan = require("morgan")("dev")

const UtilisateurRouter = require("./routes/UtilisateurRouter")
const ArtisteRouter = require("./routes/ArtisteRouter")
const AdresseUtilisateurRouter = require("./routes/AdresseUtilisateurRouter")
const AdresseRouter = require("./routes/AdresseRouter")
const ŒuvreRouter = require("./routes/ŒuvreRouter")
const PhotoRouter = require("./routes/PhotoRouter")
const TagRouter = require("./routes/TagRouter")
const TagCouleurRouter = require("./routes/TagCouleurRouter")
const CommandeRouter = require("./routes/CommandeRouter")
const CompteRouter = require("./routes/CompteRouter")


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
        let utilisateurRouter = new UtilisateurRouter(db);

        //Utilisateur :
        let artisteRouter = new ArtisteRouter(db);

        //Adresse d'utilisateur :
        let adresseUtilisateurRouter = new AdresseUtilisateurRouter(db)

        //Adresse :
        let adresseRouter = new AdresseRouter(db)

        //Œuvre :
        let œuvreRouter = new ŒuvreRouter(db)

        //Photo :
        let photoRouter = new PhotoRouter(db)

        //Tag :
        let tagRouter = new TagRouter(db)
            
        //Tag couleur :
        let tagCouleurRouter = new TagCouleurRouter(db)
            
        //Tag couleur :
        let commandeRouter = new CommandeRouter(db)

        //Compte :
        let compteRouter = new CompteRouter(db)



        //Initialisation des Routers
        app.use(config.rootAPI + `Artiste`, artisteRouter)
        app.use(config.rootAPI + `Utilisateur`, utilisateurRouter)
        app.use(config.rootAPI + `Adresse-utilisateur`, adresseUtilisateurRouter)
        app.use(config.rootAPI + `Adresse`, adresseRouter)
        app.use(config.rootAPI + `Oeuvre`, œuvreRouter)
        app.use(config.rootAPI + `Photo`, photoRouter)
        app.use(config.rootAPI + `Tag`, tagRouter)
        app.use(config.rootAPI + `Tag-couleur`, tagCouleurRouter)
        app.use(config.rootAPI + `Commande`, commandeRouter)
        app.use(config.rootAPI + `Compte`, compteRouter)



        //Démarrage de notre serveur
        app.listen(config.port, () => console.log(`Server started on port ${config.port}`))
    })
    .catch( (err) => console.error(err.message))
