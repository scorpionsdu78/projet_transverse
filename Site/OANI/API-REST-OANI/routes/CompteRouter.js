const express = require("express")
const Compte = require(process.cwd() + "/assets/classes/Compte")

const {checkAndChange} = require("./functions")


class CompteRouter extends express.Router {

    
    constructor(db){
        super()


        const compte = new Compte(db)



        this.route(`/`)

            .post(async (req, res) => {

                const result = await compte.check(req.body.nom_utilisateur, req.body.mot_de_passe)
                res.json( checkAndChange(result) )

            })

    }

}




module.exports = CompteRouter