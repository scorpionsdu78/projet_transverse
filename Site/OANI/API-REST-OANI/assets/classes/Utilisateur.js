const {config, checkNumber, checkExistingId, checkText} = require("./functions")




class Utilisateur {
    
    constructor(db){
        this.db = db
    }




    getByID(id){

        return new Promise( (next) => {
            
            this.getByID_admin(id)
                .then( (result) => {
                    if(result instanceof Error)
                        next(result)
                    
                    for(let i = 0; i < result.Adresses.length; i++){
                        
                        if(result.Adresses[i].Masquage == 1)
                            result.Adresses[i] = {
                                "Masquage": 1
                            }
    
                    }

                    next(result)
                })
                .catch( (err) => next(err) )
            })
    }


    getByID_admin(id){

        return new Promise( (next) => {
            let utilisateur = {}
            
            checkNumber(id, "id")
                .then( (result) => {
                    id = result


                    return this.db.query("SELECT ID, `Nom d'utilisateur`, `Adresse mail`, Instagram, Avatar, Description FROM Utilisateur WHERE (id = ?)", [id])
                })
                .then( (result) => {
                    if(result[0] == undefined)
                        next( new Error(config.errors.noResult + "id" + " !") )

                    else{
                        utilisateur = result[0]

                        return this.db.query("SELECT a.Pseudo FROM utilisateur u INNER JOIN `artiste` a ON u.id = a.utilisateur WHERE (u.id = ?)", [id])
                    }
                })
                .then( (result) => {
                    if(result[0] != undefined)
                        utilisateur.Pseudo = result[0].Pseudo

                    return this.db.query("SELECT a.Pays, a.`Code Postal`, a.Rue, a.`Numéro de rue`, a.`Indications Complémentaires`, a.Masquage FROM utilisateur u INNER JOIN `adresse d'utilisateur` au ON u.id = au.utilisateur INNER JOIN adresse a ON au.adresse = a.id WHERE (u.id = ?)", [id])
                })
                .then( (result) => {

                    utilisateur.Adresses = result

                    next(utilisateur)
                })
                .catch( (err) => next(err) )
            })
    }


    getAll(){

        return new Promise( (next) => {
            
            this.getAll_admin()
                .then( (result) => {
                    if(result instanceof Error)
                        next(result)
                    
                    for(let i = 0; i < result.length; i++){
                        
                        for(let j = 0; j < result[i].Adresses.length; j++){
                            
                            if(result[i].Adresses[j].Masquage == 1)
                                result[i].Adresses[j] = {
                                    "Masquage": 1
                                }
        
                        }
    
                    }

                    next(result)
                })
                .catch( (err) => next(err) )
        })

    }


    getAll_admin(){

        return new Promise( (next) => {
            let utilisateurs

            this.db.query("SELECT ID, `Nom d'utilisateur`, `Adresse mail`, Instagram, Avatar, Description FROM Utilisateur")
                .then( (result) => {
                    utilisateurs = result

                    return new Promise( (resolve, reject) => {

                        let i = 0
                        utilisateurs.forEach( async (utilisateur) => {

                            await this.db.query("SELECT a.Pseudo FROM utilisateur u INNER JOIN `artiste` a ON u.id = a.utilisateur WHERE (u.id = ?)", [utilisateur.ID])
                                .then( (result) => {
                                    if(result[0] != undefined)
                                        utilisateur.Pseudo = result[0].Pseudo
                
                                    return this.db.query("SELECT a.Pays, a.`Code Postal`, a.Rue, a.`Numéro de rue`, a.`Indications Complémentaires`, a.Masquage FROM utilisateur u INNER JOIN `adresse d'utilisateur` au ON u.id = au.utilisateur INNER JOIN adresse a ON au.adresse = a.id WHERE (u.id = ?)", [utilisateur.ID])
                                })
                                .then( (result) => {
                
                                    utilisateur.Adresses = result
                                    
                                    if(++i == utilisateurs.length)
                                        resolve(utilisateurs)
                                })
                                .catch( (err) => reject(err) )

                        })

                    })
                })
                .then( (result) => next(result) )
                .catch( (err) => next(err) )
            
        })

    }


    add(nom_utilisateur, mot_de_passe, adresse_mail, instagram, avatar, description){

        return new Promise( (next) => {

            checkText(nom_utilisateur, "nom d'utilisateur")
                .then( (result) => {
                    nom_utilisateur = result

                    return checkText(mot_de_passe, "mot de passe")
                })
                .then( (result) => {
                    mot_de_passe = result

                    return checkText(adresse_mail, "adresse mail")
                })
                .then( (result) => {
                    adresse_mail = result

                    return this.db.query("INSERT INTO utilisateur(`Nom d'utilisateur`, `Mot de passe`, `Adresse mail`, Instagram, Avatar, Description) VALUES(?, ?, ?, ?, ?, ?)", [nom_utilisateur, mot_de_passe, adresse_mail, instagram, avatar, description])
                })
                .then( (result) => {
                    const id = result.insertId

                    return this.db.query("SELECT ID, `Nom d'utilisateur`, `Adresse mail`, Instagram, Avatar, Description FROM utilisateur WHERE (id = ?)", [id])
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


    update(id, mot_de_passe, new_mot_de_passe, adresse_mail, instagram, avatar, description){

        return new Promise( (next) => {
            let bool_changement = 0;

            checkExistingId(id, "utilisateur", this.db)
                .then( (result) => {
                    id = result
                    

                    return new Promise( (resolve, reject) => {
                        
                        if( (mot_de_passe != undefined) && (mot_de_passe.trim() != "") && (new_mot_de_passe != undefined) && (new_mot_de_passe.trim() != "") ){
                            this.db.query("SELECT `Nom d'utilisateur` FROM utilisateur where ( (id = ?) AND (`Mot de passe` = ?) )", [id, mot_de_passe])
                                .then( (result) => {
                                    if (result[0] == undefined)
                                    reject( new Error("Mot de passe incorrect !") )
                        
                                    
                                    else
                                        return this.db.query("UPDATE utilisateur SET `Mot de passe` = ? WHERE (id = ?)", [new_mot_de_passe, id])   

                                })
                                .then( () => resolve(1) )
                                .catch( (err) => reject(err) )
                        }
                        
                        else
                            resolve(0)
                    })
                })
                .then( (result) => {
                    if(bool_changement == 0)
                        bool_changement += result

                    return new Promise( (resolve, reject) => {

                        if( (adresse_mail != undefined) && (adresse_mail.trim() != "") ){
                            adresse_mail = adresse_mail.trim()
                            this.db.query("SELECT `Nom d'utilisateur` FROM utilisateur where ( (id != ?) AND (`Adresse mail` = ?) )", [id, adresse_mail])
                                .then( (result) => {
                                    if (result[0] != undefined)
                                        reject( new Error(config.errors.noUnique + "adresse mail" + " !") )
                        
                                    
                                    else
                                        return this.db.query("UPDATE utilisateur SET `Adresse mail` = ? WHERE (id = ?)", [adresse_mail, id])   
                                })
                                .then( () => resolve(1) )
                                .catch( (err) => reject(err) )
                        }


                        else
                            resolve(0)
                    })
                })
                .then( (result) => {
                    if(bool_changement == 0)
                        bool_changement += result

                    return new Promise( (resolve, reject) => {

                        if( (instagram != undefined) && (instagram.trim() != "") ){
                            instagram = instagram.trim()
                            this.db.query("UPDATE utilisateur SET `Instagram` = ? WHERE (id = ?)", [instagram, id])
                                .then( () => resolve(1) )
                                .catch( (err) => reject(err) )
                        }


                        else
                            resolve(0)
                    })
                })
                .then( (result) => {
                    if(bool_changement == 0)
                        bool_changement += result

                    return new Promise( (resolve, reject) => {

                        if( (avatar != undefined) && (avatar.trim() != "") ){
                            avatar = avatar.trim()
                            this.db.query("UPDATE utilisateur SET `Avatar` = ? WHERE (id = ?)", [avatar, id])
                                .then( () => resolve(1) )
                                .catch( (err) => reject(err) )
                        }


                        else
                            resolve(0)
                    })
                })
                .then( (result) => {
                    if(bool_changement == 0)
                        bool_changement += result

                    return new Promise( (resolve, reject) => {

                        if( (description != undefined) && (description.trim() != "") ){
                            description = description.trim()
                            this.db.query("UPDATE utilisateur SET `Description` = ? WHERE (id = ?)", [description, id])
                                .then( () => resolve(1) )
                                .catch( (err) => reject(err) )
                        }


                        else
                            resolve(0)
                    })
                })
                .then( (result) => {
                    if(bool_changement == 0)
                        bool_changement += result
                        


                    if(bool_changement == 0)
                        next(false)
                    
                    else
                        next(true)
                })
                .catch( (err) => next(err) )

        })
    }


    delete(id){

        return new Promise( (next) => {
            let id_adresses_utilisateur = 0
            
            checkExistingId(id, `utilisateur`, this.db)
                .then( (result) => {
                    id = result  
                    
                    return this.db.query("SELECT id FROM `adresse d'utilisateur` WHERE (utilisateur = ?)", [id])
                })
                .then( (result) => {
                    id_adresses_utilisateur = result

                    return new Promise( (resolve, reject) => {

                        if(result[0] != undefined){
                                
                            let i = 0
                            id_adresses_utilisateur.forEach( async (item) => { 
                                let id_adresse = 0
                                
                                await this.db.query("SELECT adresse FROM `adresse d'utilisateur` WHERE (id = ?)", [item.id])
                                    .then( (result) => {
                                        id_adresse = result[0].adresse
                                        
                                        return this.db.query("DELETE FROM `adresse d'utilisateur` WHERE (id = ?)", [item.id])  
                                    })
                                    .then( () => {
                                        return this.db.query("DELETE FROM `adresse` WHERE (id = ?)", [id_adresse])   
                                    })
                                    .then( () => {
                                        if(++i == id_adresses_utilisateur.length)
                                            resolve()
                                    })
                                    .catch( (err) => reject(err) )
                                
                            })
                        }
                        
                        else{
                            resolve()
                        }

                    })
                })
                .then( () => {
                    return this.db.query("SELECT id FROM `artiste` WHERE (utilisateur = ?)", [id])
                })
                .then( (result) => {
                    if(result[0] != undefined)
                        return this.db.query("DELETE FROM `artiste` WHERE (id = ?)", [result[0].id])
                })
                .then( () => {
                    return this.db.query("DELETE FROM `utilisateur` WHERE (id = ?)", [id])
                })
                .then( () => next(`utilisateur ${id} deleted !`) )
                .catch( (err) => next(err) )
    
        })
    }

}




module.exports = Utilisateur