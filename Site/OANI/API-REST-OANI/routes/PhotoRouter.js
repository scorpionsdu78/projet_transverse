const express = require("express")
const Photo = require(process.cwd() + "/assets/classes/Photo")

const {checkAndChange} = require("./functions")


class PhotoRouter extends express.Router {

    
    constructor(db){
        super()


        const photo = new Photo(db)

        this.route(`/:id`)

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



        this.route(`/`)

            .get( async (req, res) => {

                const result = await photo.getAll(req.query.oeuvre)
                res.json(checkAndChange(result))
                    
            })
            
            .post( async (req, res) => {

                const result = await photo.add(req.body.id_oeuvre, req.body.ordre, req.body.name)
                res.json(checkAndChange(result))

            })

    }

}




module.exports = PhotoRouter