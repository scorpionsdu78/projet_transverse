const express = require("express")
const Adresse_utilisateur = require(process.cwd() + "/assets/classes/Adresse_utilisateur")

const {checkAndChange} = require("./functions")


class AdresseUtilisateurRouter extends express.Router {

    
    constructor(db){
        super()


        const adresse_utilisateur = new Adresse_utilisateur(db)

        this.route(`/`)
        
            .post( async (req, res) => {

                const result = await adresse_utilisateur.add(req.body.id_utilisateur, req.body.id_adresse)
                res.json(checkAndChange(result))

            })


        this.route(`/admin`)
        
            .post( async (req, res) => {

                const result = await adresse_utilisateur.add_admin(req.body.id_utilisateur, req.body.id_adresse)
                res.json(checkAndChange(result))

            })


        this.route(`/:id`)

            .get( async (req, res) => {

                const result = await adresse_utilisateur.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })

            .delete( async (req, res) => {

                const result = await adresse_utilisateur.delete(req.params.id)             
                res.json( checkAndChange(result) )
                
            })


        this.route(`/admin/:id`)

            .get( async (req, res) => {

                const result = await adresse_utilisateur.getByID_admin(req.params.id)             
                res.json( checkAndChange(result) )
                
            })


        this.route(`/utilisateur/:id`)

            .get( async (req, res) => {

                const result = await adresse_utilisateur.getByUtilisateur(req.params.id)
                res.json(checkAndChange(result))

            })


        this.route(`/admin/utilisateur/:id`)

            .get( async (req, res) => {

                const result = await adresse_utilisateur.getByUtilisateur_admin(req.params.id)
                res.json(checkAndChange(result))

            })


    }

}




module.exports = AdresseUtilisateurRouter