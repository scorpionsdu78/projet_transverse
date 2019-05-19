const {checkText} = require("./functions")



class Compte {
    
    constructor(db){
        this.db = db
    }




    check(nom_utilisateur, mot_de_passe){
        return new Promise( (next) => {

            checkText(nom_utilisateur, "nom d'utilisateur")
                .then( (result) => {
                    nom_utilisateur = result

                    return checkText(mot_de_passe, "mot de passe")
                })
                .then( (result) => {
                    mot_de_passe = result

                    return this.db.query("SELECT (`Mot de passe` = PASSWORD(?)) AS `check`, ID FROM `compte view` WHERE (`Nom d'utilisateur` = ?)", [mot_de_passe, nom_utilisateur])    
                })
                .then( (result) => next((result[0].check == 0) ? 0 : result[0].ID ) )
                .catch( (err) => next(err) )      
        })
    }

}




module.exports = Compte;