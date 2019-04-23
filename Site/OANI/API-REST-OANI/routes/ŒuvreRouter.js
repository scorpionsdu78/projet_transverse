const express = require("express")
const Œuvre = require(process.cwd() + "/assets/classes/Œuvre")

const {checkAndChange} = require("./functions")


class ŒuvreRouter extends express.Router {

    
    constructor(db){
        super()


        const œuvre = new Œuvre(db)

        this.route(`/:id`)

            .get( async (req, res) => {

                const result = await œuvre.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })

            .put( async (req, res) => {

                const result = await œuvre.update()
                res.json( checkAndChange(result) )

            })
            
            .delete( async (req, res) => {

                const result = await œuvre.delete(req.params.id)
                res.json( checkAndChange(result) )
                
            })



        this.route(`/`)

            .get( async (req, res) => {

                const result = await œuvre.getAll(req.query.id_auteur)
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await œuvre.add(req.body.titre, req.body.id_auteur, req.body.description, req.body.prix, req.body.id_adresse)
                res.json(checkAndChange(result))

            })

    }

}




module.exports = ŒuvreRouter