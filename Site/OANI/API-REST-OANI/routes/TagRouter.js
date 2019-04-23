const express = require("express")
const Tag = require(process.cwd() + "/assets/classes/Tag")

const {checkAndChange} = require("./functions")


class TagRouter extends express.Router {

    
    constructor(db){
        super()

        
        const tag = new Tag(db)

        this.route(`/:id`)

            .get( async (req, res) => {

                const result = await tag.getByID(req.params.id)             
                res.json( checkAndChange(result) )
                
            })
            
            .delete( async (req, res) => {

                const result = await tag.delete(req.params.id)
                res.json( checkAndChange(result) )
                
            })



        this.route(`/`)

            .get( async (req, res) => {

                const result = await tag.getAll(req.query.oeuvre)
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await tag.add(req.body.tag, req.body.id_oeuvre)
                res.json(checkAndChange(result))

            })

    }

}




module.exports = TagRouter