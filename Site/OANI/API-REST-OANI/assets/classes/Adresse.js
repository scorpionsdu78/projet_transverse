const {config, checkNumber, checkText, checkExistingId, checkBoolean} = require("./functions")




class Adresse {
    
    constructor(db){
        this.db = db
    }




    getByID(id){
        return new Promise((next) => {

            this.getByID_admin(id)
                .then( (result) => {
                    if(result instanceof Error)
                        next(result)

                    
                    else if(result.Masquage == 1)
                        next({"Masquage": "1"})
                    

                    else
                        next(result)
                })
                .catch( (err) => next(err) )

        })
    }


    getByID_admin(id){
        return new Promise((next) => {

            checkNumber(id, "id")
                .then( (result) => {
                    id = result

                    return this.db.query("SELECT * FROM `adresse` WHERE (id = ?)", [id])
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


    add(pays, code_postal, rue, numero, indications, masquage){

        return new Promise( (next) => {
            
            this.add_admin(pays, code_postal, rue, numero, indications, masquage)
                .then( (result) => {
                    if(result instanceof Error)
                        next(result)


                    else if(result.Masquage == 1)
                        next({"Masquage": "1"})
                    

                    else
                        next(result)
                })
                .catch( (err) => next(err) )

        })

    }


    add_admin(pays, code_postal, rue, numero, indications, masquage){

        return new Promise( (next) => {
            if( (!pays) || (pays.trim() == "") || (!rue) || (rue.trim() == ""))
                next( new Error(config.errors.noValue) )
            
            checkText(pays, "pays")
                .then( (result) => {
                    pays = result

                    return checkText(rue, "rue")
                })
                .then( (result) => {
                    rue = result

                    return checkNumber(code_postal, "code postal")
                })
                .then( (result) => {
                    code_postal = result

                    return checkNumber(numero, "numero")
                })
                .then( (result) => {
                    numero = result

                    return checkBoolean(masquage, "masquage")
                })
                .then( (result) => {
                    masquage = result

                    if(!indications)
                        indications = "";
                    else
                        indications = indications.trim()

                    return this.db.query("INSERT INTO `adresse` VALUES (null, ?, ?, ?, ?, ?, ?)", [pays, code_postal, rue, numero, indications, masquage])
                })
                .then( (result) => {

                    return this.db.query("SELECT * FROM `adresse` WHERE (ID = ?)", [result.insertId])
                })
                .then( (result) => {
                    if(result[0] == undefined)
                        next( new Error(config.errors.noResultId) )

                    else
                        next(result[0])
                })
                .catch( (err) => next(err) )

        })

    }


    delete(id){

        return new Promise( (next) => {
            
            checkExistingId(id, "adresse", this.db)
                .then( (result) => {
                    id = result        
                    
                    return this.db.query('DELETE FROM `adresse` WHERE (id = ?)', [id])    
                })
                .then( () => {
                    next(`adresse ${id} deleted !`)
                })
                .catch( (err) => next(err) )
    
        })
    }

}




module.exports = Adresse;