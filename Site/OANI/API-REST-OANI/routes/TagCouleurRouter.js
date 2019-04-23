const express = require("express")
const TagCouleur = require(process.cwd() + "/assets/classes/Tag_couleur")

const {checkAndChange} = require("./functions")


class TagCouleurRouter extends express.Router {

    
    constructor(db){
        super()

        
        const tag_couleur = new TagCouleur(db)


        this.route(`/:id`)

            .get( async (req, res) => {

                const result = await tag_couleur.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })
            
            .delete( async (req, res) => {

                const result = await tag_couleur.delete(req.params.id)
                res.json( checkAndChange(result) )
                
            })



        this.route(`/`)

            .get( async (req, res) => {

                const result = await tag_couleur.getAll(req.query.oeuvre)
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await tag_couleur.add(req.body.tag, req.body.id_oeuvre)
                res.json(checkAndChange(result))

            })

    }

}




module.exports = TagCouleurRouter