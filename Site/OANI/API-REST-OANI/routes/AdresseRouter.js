const express = require("express")
const Adresse = require(process.cwd() + "/assets/classes/Adresse")

const {checkAndChange} = require("./functions")


class AdresseRouter extends express.Router {

    
    constructor(db){
        super()

        
        const adresse = new Adresse(db)

        this.route(`/:id`)

            .get( async (req, res) => {

                const result = await adresse.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })
            
            .delete( async (req, res) => {

                const result = await adresse.delete(req.params.id)
                res.json( checkAndChange(result) )
                
            })


        this.route(`/admin/:id`)

            .get( async (req, res) => {

                const result = await adresse.getByID_admin(req.params.id)             
                res.json( checkAndChange(result) )
                
            })



        this.route(`/`)
            
            .post( async (req, res) => {

                const result = await adresse.add(req.body.pays, req.body.code_postal, req.body.rue, req.body.numero, req.body.indications, req.body.masquage)
                res.json(checkAndChange(result))

            })



        this.route(`/admin`)
            
            .post( async (req, res) => {

                const result = await adresse.add_admin(req.body.pays, req.body.code_postal, req.body.rue, req.body.numero, req.body.indications, req.body.masquage)
                res.json(checkAndChange(result))

            })

    }

}




module.exports = AdresseRouter