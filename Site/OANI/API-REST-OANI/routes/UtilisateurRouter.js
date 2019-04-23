const express = require("express")
const Utilisateur = require(process.cwd() + "/assets/classes/Utilisateur")

const {checkAndChange} = require(process.cwd() + "/assets/functions")


class UtilisateurRouter extends express.Router {

    
    constructor(db){
        super()

        
        const utilisateur = new Utilisateur(db)

        this.route(`/:id`)

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


        this.route(`/admin/id/:id`)

            .get( async (req, res) => {

                const result = await utilisateur.getByID_admin(req.params.id)             
                res.json( checkAndChange(result) )
                
            })



        this.route(`/`)

            .get( async (req, res) => {

                const result = await utilisateur.getAll()
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await utilisateur.add(req.body.nom_utilisateur, req.body.mot_de_passe, req.body.adresse_mail, req.body.instagram, req.body.avatar, req.body.description)
                res.json(checkAndChange(result))

            })


        this.route(`/admin/all`)

            .get( async (req, res) => {

                const result = await utilisateur.getAll_admin()             
                res.json( checkAndChange(result) )
                
            })


    }

}




module.exports = UtilisateurRouter