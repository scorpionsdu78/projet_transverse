const {config, checkNumber, checkExistingId, checkText} = require("./functions")




class Commande {
    
    constructor(db){
        this.db = db
    }




    getByID(id){

        return new Promise( (next) => {
            
            checkNumber(id, "id")
                .then( (result) => {
                    id = result

                    return this.db.query("SELECT * FROM Commande WHERE (id = ?)", [id])
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



    getAll(){

        return new Promise( (next) => {
            
            this.db.query("SELECT * FROM Commande")
                .then( (result) => {
                        next(result)
                })
                .catch( (err) => next(err) )
            })

    }


    add(id_acheteur, id_oeuvre, date, date_de_fin, id_adresse){

        return new Promise( (next) => {

            checkExistingId(id_acheteur, "utilisateur", this.db)
                .then( (result) => {
                    id_acheteur = result

                    return checkExistingId(id_oeuvre, "Œuvre", this.db)
                })
                .then( (result) => {
                    id_oeuvre = result

                    return checkExistingId(id_adresse, "adresse", this.db)
                })
                .then( (result) => {
                    id_adresse = result

                    return this.db.query("INSERT INTO Commande(Acheteur, `Œuvre`, Etat, date, `date de fin`, Localisation) VALUES(?, ?, ?, ?, ?, ?)", [id_acheteur, id_oeuvre, 0, date, date_de_fin, id_adresse])
                })
                .then( (result) => {
                    const id = result.insertId

                    return this.db.query("SELECT * FROM Commande WHERE (id = ?)", [id])
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


    update(id, etat){

        return new Promise( (next) => {
            console.log(etat)

            checkExistingId(id, "commande", this.db)
                .then( (result) => {
                    id = result
                    

                    return checkNumber(etat)
                })
                .then( (result) => {
                    etat = result

                    return this.db.query("UPDATE commande SET `Etat` = ? WHERE (id = ?)", [etat, id])
                })
                .then( () => next(true) )
                .catch( (err) => next(err) )

        })
    }

}




module.exports = Commande