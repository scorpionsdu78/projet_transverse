const express = require("express")
const Artiste = require(process.cwd() + "/assets/classes/Artiste")

const {checkAndChange} = require("./functions")


class ArtisteRouter extends express.Router {

    
    constructor(db){
        super()

        
        const artiste = new Artiste(db)

        this.route(`/:id`)

            .get( async (req, res) => {

                const result = await artiste.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })

            .put( async (req, res) => {

                const result = await artiste.update(req.params.id, req.body.mot_de_passe, req.body.new_mot_de_passe, req.body.adresse_mail, req.body.instagram, req.body.avatar, req.body.description)
                res.json( checkAndChange(result) )

            })
            
            .delete( async (req, res) => {

                const result = await artiste.delete(req.params.id)
                res.json( checkAndChange(result) )
                
            })


        this.route(`/admin/id/:id`)

            .get( async (req, res) => {

                const result = await artiste.getByID_admin(req.params.id)             
                res.json( checkAndChange(result) )
                
            })



        this.route(`/`)

            .get( async (req, res) => {

                const result = await artiste.getAll()
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await artiste.add(req.body.id_utilisateur, req.body.pseudo)
                res.json(checkAndChange(result))

            })


        this.route(`/admin/all`)

            .get( async (req, res) => {

                const result = await artiste.getAll_admin()             
                res.json( checkAndChange(result) )
                
            })


    }

}




module.exports = ArtisteRouter