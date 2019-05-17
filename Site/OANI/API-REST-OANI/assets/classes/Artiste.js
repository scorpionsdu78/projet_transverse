const {config, checkNumber, checkExistingId, checkText} = require("./functions")




class Artiste {
    
    constructor(db){
        this.db = db
    }




    getByID(id){

        return new Promise( (next) => {
            
            this.getByID_admin(id)
                .then( (result) => {
                    if(result instanceof Error)
                        next(result)
                    
                    for(let i = 0; i < result.Utilisateur.Adresses.length; i++){
                        
                        if(result.Utilisateur.Adresses[i].Masquage == 1)
                            result.Utilisateur.Adresses[i] = {
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
            let id_utilisateur;
            let artiste = {}
            
            checkNumber(id, "id")
                .then( (result) => {
                    id = result

                    return this.db.query("SELECT * FROM Artiste WHERE (id = ?)", [id])
                })
                .then( (result) => {
                    if(result[0] == undefined)
                        next( new Error(config.errors.noResult + "id" + " !") )

                    
                    else{
                        artiste = result[0];
                        id_utilisateur = result[0].Utilisateur;
    
                        return this.db.query("SELECT ID, `Nom d'utilisateur`, `Adresse mail`, Instagram, Avatar, Description FROM Utilisateur WHERE (id = ?)", [id_utilisateur])    
                    }
                })
                .then( (result) => {
                    if(result[0] == undefined)
                        next( new Error(config.errors.noResult + "id" + " !") )

                    else{
                        artiste.Utilisateur = result[0]

                        return this.db.query("SELECT a.Pays, a.`Code Postal`, a.Rue, a.`Numéro de rue`, a.`Indications Complémentaires`, a.Masquage FROM utilisateur u INNER JOIN `adresse d'utilisateur` au ON u.id = au.utilisateur INNER JOIN adresse a ON au.adresse = a.id WHERE (u.id = ?)", [id_utilisateur])
                    }
                })
                .then( (result) => {
                    artiste.Utilisateur.Adresses = result

                    next(artiste)
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
                        
                        for(let j = 0; j < result[i].Utilisateur.Adresses.length; j++){
                            
                            if(result[i].Utilisateur.Adresses[j].Masquage == 1)
                                result[i].Utilisateur.Adresses[j] = {
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
            let artistes

            this.db.query("SELECT * FROM Artiste")
                .then( (result) => {
                    artistes = result

                    return new Promise( (resolve, reject) => {

                        let i = 0
                        artistes.forEach( async (artiste) => {
                            let id_utilisateur

                            await this.db.query("SELECT u.ID FROM Utilisateur u INNER JOIN Artiste a ON (a.Utilisateur = u.id) WHERE (a.id = ?)", [artiste.ID])
                                .then( (result) => {
                                    id_utilisateur = result[0].ID
                
                                    return this.db.query("SELECT ID, `Nom d'utilisateur`, `Adresse mail`, Instagram, Avatar, Description FROM Utilisateur WHERE (id = ?)", [id_utilisateur])
                                })
                                .then( (result) => {
                                    artiste.Utilisateur = result[0]
                
                                    return this.db.query("SELECT a.Pays, a.`Code Postal`, a.Rue, a.`Numéro de rue`, a.`Indications Complémentaires`, a.Masquage FROM utilisateur u INNER JOIN `adresse d'utilisateur` au ON u.id = au.utilisateur INNER JOIN adresse a ON au.adresse = a.id WHERE (u.id = ?)", [id_utilisateur])
                                })
                                .then( (result) => {
                                    artiste.Utilisateur.Adresses = result
                                    
                                    if(++i == artistes.length)
                                        resolve(artistes)
                                })
                                .catch( (err) => reject(err) )

                        })

                    })
                })
                .then( (result) => next(result) )
                .catch( (err) => next(err) )
            
        })

    }


    add(id_utilisateur, pseudo){

        return new Promise( (next) => {

            checkExistingId(id_utilisateur, "utilisateur", this.db)
                .then( (result) => {
                    id_utilisateur = result

                    return checkText(pseudo, "pseudo")
                })
                .then( (result) => {
                    pseudo = result

                    return this.db.query("INSERT INTO artiste(Utilisateur, Pseudo) VALUES(?, ?)", [id_utilisateur, pseudo])
                })
                .then( (result) => {
                    const id = result.insertId

                    return this.db.query("SELECT * FROM artiste WHERE (id = ?)", [id])
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


    update(id, pseudo){

        return new Promise( (next) => {

            checkExistingId(id, "artiste", this.db)
                .then( (result) => {
                    id = result
                    

                    return checkText(pseudo)
                })
                .then( (result) => {
                    pseudo = result

                    return this.db.query('SELECT pseudo FROM artiste WHERE ( (pseudo = ?) AND (id != ?) )', [pseudo, id])
                })
                .then( (result) => {
                    if(result[0] != undefined)
                        next( new Error(config.errors.noUnique + "pseudo" + " !") )

                    else
                        return this.db.query("UPDATE artiste SET `Pseudo` = ? WHERE (id = ?)", [pseudo, id])
                })
                .then( () => next(true) )
                .catch( (err) => next(err) )

        })
    }


    //NE SUPPRIME PAS ENCORE LES OEUVRES DE L'ARTISTE
    delete(id){

        return new Promise( (next) => {
            let id_adresses_utilisateur
            let id_utilisateur
            
            checkExistingId(id, `artiste`, this.db)
                .then( (result) => {
                    id = result  
                    
                    return this.db.query("SELECT Utilisateur FROM artiste WHERE (id = ?)", [id])
                })
                .then( (result) => {
                    id_utilisateur = result[0].ID  
                    
                    return this.db.query("SELECT id FROM `adresse d'utilisateur` WHERE (Utilisateur = ?)", [id_utilisateur])
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
                    return this.db.query("DELETE FROM `artiste` WHERE (id = ?)", [id])
                })
                .then( () => {
                    return this.db.query("DELETE FROM `utilisateur` WHERE (id = ?)", [id_utilisateur])
                })
                .then( () => next(`artiste ${id} deleted !`) )
                .catch( (err) => next(err) )
    
        })
    }

}




module.exports = Artiste