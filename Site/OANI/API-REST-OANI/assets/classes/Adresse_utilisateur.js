const {config, checkNumber, checkExistingId} = require("./functions")



class Adresse_utilisateur{
    
    constructor(db){
        this.db = db
    }




    getByID(id){
        return new Promise((next) => {

            this.getByID_admin(id)
                .then( (result) => {
                    
                    if(result.Masquage == 1)
                        result = {
                            "ID": result.ID,
                            "Utilisateur": result.Utilisateur,
                            "Masquage": 1
                        }
                        
                        
                    next(result)

                })

        })
    }


    getByID_admin(id){
        return new Promise((next) => {

            checkNumber(id, "id")
                .then( (result) => {
                    id = result

                    return this.db.query("SELECT au.ID, au.Utilisateur, a.Pays, a.`Code Postal`, a.Rue, a.`Numéro de rue`, a.`Indications Complémentaires`, a.Masquage FROM `adresse d'utilisateur` au INNER JOIN `adresse` a ON au.adresse = a.ID WHERE (au.id = ?)", [id])
                })
                .then( (result) => {
                    if(result[0] == undefined)
                        next( new Error(config.errors.noResult + "id" + " !") )
                        
                    else 
                        next(result[0])

                })
                .catch( (err) => next(err) )

        })
    }


    getByUtilisateur(id_utilisateur){

        return new Promise((next) => {

            this.getByUtilisateur_admin(id_utilisateur)
                .then( (result) => {
        
                    for(let i = 0; i < result.length; i++){
                        
                        if(result[i].Masquage == 1)
                            result[i] = {
                                "ID": result[i].ID,
                                "Utilisateur": result[i].Utilisateur,
                                "Masquage": 1
                            }
    
                    }
                        
                        
                    next(result)

                })

        })
    }


    getByUtilisateur_admin(id_utilisateur){

        return new Promise((next) => {

            checkExistingId(id_utilisateur, "utilisateur", this.db)
            .then( (result) => {
                id_utilisateur = result

                return this.db.query("SELECT au.ID, au.Utilisateur, a.Pays, a.`Code Postal`, a.Rue, a.`Numéro de rue`, a.`Indications Complémentaires`, a.Masquage FROM `adresse d'utilisateur` au INNER JOIN `adresse` a ON au.adresse = a.ID WHERE (au.utilisateur = ?)", [id_utilisateur])
            })
            .then( (result) => next(result) )
            .catch( (err) => next(err) )

        })
    }


    add(id_utilisateur, id_adresse){

        return new Promise( (next) => {

            this.add_admin(id_utilisateur, id_adresse)
                .then( (result) => {
                    if(result.Masquage == 1)
                        result = {
                            "ID": result.ID,
                            "Utilisateur": result.Utilisateur,
                            "Masquage": 1
                        }
                        
                        
                    next(result)
                })
                .catch( (err) => next(err) )
        })

    }


    add_admin(id_utilisateur, id_adresse){

        return new Promise( (next) => {

            checkExistingId(id_utilisateur, "utilisateur", this.db)
                .then( (result) => {
                    id_utilisateur = result

                    return checkExistingId(id_adresse, "adresse", this.db)
                })
                .then( (result) => {
                    id_adresse = result

                    return this.db.query("INSERT INTO `adresse d'utilisateur` VALUES (null, ?, ?)", [id_utilisateur, id_adresse])
                })
                .then( (result) => {

                    return this.db.query("SELECT au.ID, au.Utilisateur, a.Pays, a.`Code Postal`, a.Rue, a.`Numéro de rue`, a.`Indications Complémentaires`, a.Masquage FROM `adresse d'utilisateur` au INNER JOIN `adresse` a ON au.adresse = a.ID WHERE (au.ID = ?)", [result.insertId])
                })
                .then( (result) => {
                    if(result[0] == undefined)
                        next( new Error(config.errors.noResult + "id" + " !") )

                    else  
                        next(result[0])
                })
                .catch( (err) => next(err) )
        })

    }


    delete(id){

        return new Promise( (next) => {
            let id_adresse = 0
            
            checkExistingId(id, `adresse d'utilisateur`, this.db)
                .then( (result) => {
                    console.log("test1")
                    id = result   
                    
                    return this.db.query("SELECT adresse FROM `adresse d'utilisateur` WHERE (id = ?)", [id])
                })
                .then( (result) => {
                    id_adresse = result[0].adresse

                    return this.db.query("DELETE FROM `adresse d'utilisateur` WHERE (id = ?)", [id])  
                })
                .then( () => {

                    return this.db.query("DELETE FROM `adresse` WHERE (id = ?)", [id_adresse])   
                })
                .then( () => {
                    next(`adresse d'utilisateur ${id} deleted !`)
                })
                .catch( (err) => next(err) )
    
        })
    }

}




module.exports = Adresse_utilisateur;