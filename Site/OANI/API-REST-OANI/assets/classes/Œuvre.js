const {config, checkNumber, checkExistingId, checkText} = require("./functions")



class Œuvre {
    
    constructor(db){
        this.db = db
    }




    getByID(id){
        return new Promise((next) => {

            checkNumber(id, "id")
                .then( (result) => {
                    id = result

                    return this.db.query("SELECT * FROM `Œuvre` WHERE (id = ?)", [id])
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


    getAll(id_auteur){

        return new Promise( (next) => {

            if(id_auteur){
                console.log("test")

                checkExistingId(id_auteur, "artiste", this.db)
                    .then((result) => {
                        id_auteur = result

                        return this.db.query('SELECT * FROM `Œuvre` WHERE (Auteur = ?)', [id_auteur])
                    })
                    .then( (result) => next(result) )
                    .catch( (err) => next(err) )

            }


            else{

                this.db.query('SELECT * FROM `Œuvre`')
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
                    return this.db.query('SELECT * FROM photo WHERE (url = ?)', [result.insertId])
                })
                .then( (result) => next(result[0]) )
                .catch( (err) => next(err) )

        })

    }


    update(id, ordre){

        return new Promise( (next) => {
            checkExistingId(id, "photo", this.db)
                .then( (result) => {
                    id = result;

                    return checkNumber(ordre, "ordre")
                })
                .then( (result) => {
                    ordre = result

                    console.log(`id : ${id}`)
                    return this.db.query('SELECT `Œuvre` FROM photo WHERE (id = ?)', [id])
                })
                .then( (result) => {
                    let id_oeuvre = result[0][`Œuvre`]
                    return this.db.query('SELECT ordre FROM photo WHERE ( (`Œuvre` = ?) AND (ordre = ?) AND (id != ?) )', [id_oeuvre, ordre, id])
                })
                .then( (result) => {
                    if(result[0] != undefined)
                        next( new Error(config.errors.noUnique + "ordre" + " !") )

                    
                    else

                        return this.db.query('UPDATE photo SET ordre = ? WHERE (id = ?)', [ordre, id])
                })
                .then( () => next(true) )
                .catch( (err) => next(err) )

        })
    }


    delete(id){

        return new Promise( (next) => {
            
            checkExistingId(id, "photo", this.db)
                .then( (result) => {
                    id = result
                    
                    return this.db.query('DELETE FROM photo WHERE (id = ?)', [id])    
                })
                .then( () => {
                    return this.db.query('SELECT * FROM photo ORDER BY `Œuvre`, ordre')
                })
                .then( (result) =>{
                    next(result)
                })
                .catch( (err) => next(err) )
    
        })
    }

}




module.exports = Œuvre