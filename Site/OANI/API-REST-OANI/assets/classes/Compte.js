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

                    return this.db.query("SELECT (`Mot de passe` = PASSWORD(?)) AS `check` FROM `compte view` WHERE (`Nom d'utilisateur` = ?)", [mot_de_passe, nom_utilisateur])    
                })
                .then( (result) =>{
                    if( result[0] == undefined || result[0].check == 0)
                        next(0)
                    
                    else
                        return this.db.query("SELECT ID, `Nom d'utilisateur`, `Avatar` FROM `compte view` WHERE (`Nom d'utilisateur` = ?)", [nom_utilisateur])
                })
                .then( (result) => {
                    if(result[0] != undefined)
                        next(result[0])
                })
                .catch( (err) => next(err) )      
        })
    }

}




module.exports = Compte;