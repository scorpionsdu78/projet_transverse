const {config, checkNumber, checkExistingId, checkText} = require("./functions")



class Œuvre {
    
    constructor(db){
        this.db = db
    }




    getByID(id){
        return new Promise((next) => {
            let oeuvre

            checkNumber(id, "id")
                .then( (result) => {
                    id = result

                    return this.db.query("SELECT * FROM `Œuvre` WHERE (id = ?)", [id])
                })
                .then( (result) => {
                    if(result[0] == undefined)
                        next( new Error(config.errors.noResult + "id" + " !") )

                    else{
                        oeuvre = result[0]
    
                        return this.db.query('SELECT * FROM photo WHERE (`Œuvre` = ?) ORDER BY ordre',[oeuvre.ID])
                    }
                })
                .then( (result) => {
                    oeuvre.Photos = result

                    return this.db.query('SELECT * FROM tag WHERE (`Œuvre` = ?)',[oeuvre.ID])
                })
                .then( (result) => {
                    oeuvre.Tags = result

                    next(oeuvre)
                })
                .catch( (err) => next(err) )

        })
    }


    getAll(id_auteur){

        return new Promise( (next) => {
            let oeuvres

            if(id_auteur){

                checkExistingId(id_auteur, "artiste", this.db)
                    .then((result) => {
                        id_auteur = result

                        return this.db.query('SELECT * FROM `Œuvre` WHERE (Auteur = ?)', [id_auteur])
                    })
                    .then( (result) => {
                        oeuvres = result

                        return new Promise( (resolve, reject) => {

                            let i = 0
                            oeuvres.forEach( async (oeuvre) => {
    
                                await this.db.query('SELECT * FROM photo WHERE (`Œuvre` = ?) ORDER BY ordre',[oeuvre.ID])
                                    .then( (result) => {
                                        oeuvre.Photos = result
                                        
                                        return this.db.query('SELECT * FROM tag WHERE (`Œuvre` = ?)',[oeuvre.ID])
                                    })
                                    .then( (result) => {
                                        oeuvre.Tags = result
                                        
                                        if(++i == oeuvres.length)
                                            resolve(oeuvres)
                                    })
                                    .catch( (err) => reject(err) )
    
                            })

                        })
                    })
                    .then( (result) => next(result) )
                    .catch( (err) => next(err) )

            }


            else{

                this.db.query('SELECT * FROM `Œuvre`')
                .then( (result) => {
                    oeuvres = result

                    return new Promise( (resolve, reject) => {

                        let i = 0
                        oeuvres.forEach( async (oeuvre) => {

                            await this.db.query('SELECT * FROM photo WHERE (`Œuvre` = ?) ORDER BY ordre',[oeuvre.ID])
                                .then( (result) => {
                                    oeuvre.Photos = result
                                    
                                    return this.db.query('SELECT * FROM tag WHERE (`Œuvre` = ?)',[oeuvre.ID])
                                })
                                .then( (result) => {
                                    oeuvre.Tags = result
                                    
                                    if(++i == oeuvres.length)
                                        resolve(oeuvres)
                                })
                                .catch( (err) => reject(err) )

                        })

                    })
                })
                .then( (result) => next(result) )
                    .catch( (err) => next(err) )

            }
            
        })

    }


    add(titre, id_auteur, description, prix, id_adresse){

        return new Promise( (next) => {
            
            checkText(titre, "titre")
                .then( (result) => {
                    titre = result

                    return checkExistingId(id_auteur, "artiste", this.db)
                })
                .then( (result) => {
                    id_auteur = result

                    return checkNumber(prix, "prix")
                })
                .then( (result) => {
                    prix = result

                    return checkExistingId(id_adresse, "adresse", this.db)
                })
                .then( (result) => {
                    id_adresse = result

                    return this.db.query('INSERT INTO `Œuvre`(Titre, Auteur, Description, `Prix de location`, Localisation) VALUES(?, ?, ?, ?, ?)', [titre, id_auteur, description, prix, id_adresse])

                })
                .then( (result) => {
                    return this.db.query('SELECT * FROM `Œuvre` WHERE (id = ?)', [result.insertId])
                })
                .then( (result) => next(result[0]) )
                .catch( (err) => next(err) )

        })

    }


    update(id, titre, description, prix, id_adresse){

        return new Promise( (next) => {
            let bool_changement = 0

            checkExistingId(id, "Œuvre", this.db)
                .then( (result) => {
                    id = result;

                    return new Promise( (resolve, reject) => {

                        if( (titre != undefined) && (titre.trim() != "") ){
                            titre = titre.trim()

                            this.db.query("UPDATE `Œuvre` SET Titre = ? WHERE (id = ?)", [titre, id])
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

                            this.db.query("UPDATE `Œuvre` SET Description = ? WHERE (id = ?)", [description, id])
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

                        if( (prix != undefined ) && (parseInt(prix) == prix) ){
                            prix = parseInt(prix)

                            this.db.query("UPDATE `Œuvre` SET `Prix de location` = ? WHERE (id = ?)", [prix, id])
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

                        if( (id_adresse != undefined ) && (parseInt(id_adresse) == id_adresse) && (id_adresse > 0) ){
                            id_adresse = parseInt(id_adresse)

                            this.db.query("UPDATE `Œuvre` SET Localisation = ? WHERE (id = ?)", [id_adresse, id])
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
            
            checkExistingId(id, "Œuvre", this.db)
                .then( (result) => {
                    id = result
                    
                    return this.db.query('DELETE FROM Photo WHERE (Œuvre = ?)', [id])    
                })
                .then( () => {
                    
                    return this.db.query('DELETE FROM Tag WHERE (Œuvre = ?)', [id])    
                })
                .then( () => {
                    
                    return this.db.query('DELETE FROM `Tag couleur` WHERE (Œuvre = ?)', [id])    
                })
                .then( () => {
                    
                    return this.db.query('DELETE FROM Œuvre WHERE (id = ?)', [id])    
                })
                .then( () =>{
                    next(true)
                })
                .catch( (err) => next(err) )
    
        })
    }

}




module.exports = Œuvre