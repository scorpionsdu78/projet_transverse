const express = require("express")
const Commande = require(process.cwd() + "/assets/classes/Commande")

const {checkAndChange} = require("./functions")


class CommandeRouter extends express.Router {

    
    constructor(db){
        super()

        
        const commande = new Commande(db)

        this.route(`/:id`)

            .get( async (req, res) => {

                const result = await commande.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })

            .put( async (req, res) => {

                const result = await commande.update(req.params.id, req.body.etat)
                res.json( checkAndChange(result) )

            })
            
            .delete( async (req, res) => {

                const result = await commande.delete(req.params.id)
                res.json( checkAndChange(result) )
                
            })


        this.route(`/admin/id/:id`)

            .get( async (req, res) => {

                const result = await commande.getByID_admin(req.params.id)             
                res.json( checkAndChange(result) )
                
            })



        this.route(`/`)

            .get( async (req, res) => {

                const result = await commande.getAll()
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await commande.add(req.body.id_acheteur, req.body.id_oeuvre, req.body.date, req.body.date_de_fin, req.body.id_adresse)
                res.json(checkAndChange(result))

            })


        this.route(`/admin/all`)

            .get( async (req, res) => {

                const result = await commande.getAll_admin()             
                res.json( checkAndChange(result) )
                
            })


    }

}




module.exports = CommandeRouter