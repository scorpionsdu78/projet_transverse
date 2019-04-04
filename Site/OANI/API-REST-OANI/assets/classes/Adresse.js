const config = {
    errors : {
        noValue : "Pas de valeur",
        //Num
        wrongValueNum : "Mauvaise valeur pour un numéro attendu !",
        wrongTypeNum : "Mauvais type pour un numéro attendu !",
        //Bool
        wrongValueBool : "Mauvaise valeur pour un boolean attendu !",
        wrongTypeBool : "Mauvais type pour un boolean attendu !",
        //ID
        wrongValueId : "Mauvaise valeur pour id !",
        wrongTypeId : "Mauvais type pour id !",
        noResultId : "Aucun résultat pour cet id !",
        noValueId : "Pas de valeur pour id !",
    }
}




class Adresse {
    
    constructor(db){
        this.db = db
    }




    getByID(id){
        return new Promise((next) => {

            checkId(id)
                .then( (result) => {
                    id = result

                    return this.db.query("SELECT * FROM `adresse` WHERE (id = ?)", [id])
                })
                .then( (result) => {
                    if(result[0] == undefined)
                        next( new Error(config.errors.noResultId) )

                    else{
                        if(result[0].Masquage == 1)
                            next({"Masquage": "1"})
                        
                        else
                            next(result[0])
                    }
                })
                .catch( (err) => next(err) )

        })
    }


    add(pays, code_postal, rue, numero, indications, masquage){

        return new Promise( (next) => {
            if( (!pays) || (pays.trim() == "") || (!rue) || (rue.trim() == ""))
                next( new Error(config.errors.noValue) )
            
            
            else {
                checkNumber(code_postal)
                    .then( (result) => {
                        code_postal = result

                        return checkNumber(numero)
                    })
                    .then( (result) => {
                        numero = result

                        return checkMasquage(masquage)
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
    
                        else{
                            if(result[0].Masquage == 1)
                                next({"Masquage": "1"})
                            
                            else
                                next(result[0])
                        }
                    })
                    .catch( (err) => next(err) )
            }

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




function checkId(id) {

    return new Promise( (resolve, reject) => {

        if(!id)
            reject( new Error(config.errors.noValueId) )
    
    
        else if(parseInt(id) != id)
            reject( new Error(config.errors.wrongTypeId) )
    
    
        else if(id <= 0)
            reject( new Error(config.errors.wrongValueId) )
    
        resolve(parseInt(id))

    })

}


function checkNumber(num) {

    return new Promise( (resolve, reject) => {

        if(!num)
            reject( new Error(config.errors.noValue) )
    
    
        else if(parseInt(num) != num)
            reject( new Error(config.errors.wrongTypeNum) )
    
    
        else if(num <= 0)
            reject( new Error(config.errors.wrongValueNum) )
    
        resolve(parseInt(num))

    })

}


function checkMasquage(bool){

    return new Promise( (resolve, reject) => {

        if(!bool)
            reject( new Error(config.errors.noValue) )
    
    
        else if(parseInt(bool) != bool)
            reject( new Error(config.errors.wrongTypeBool) )
    
    
        else if( (bool < 0) || (bool > 1) ) 
            reject( new Error(config.errors.wrongValueBool) )
    
        resolve(parseInt(bool))

    })

}


function checkExistingId(id, table, db) {

    return new Promise( (resolve, reject) => {

        checkId(id)
            .then( (result) => {
                id = result;

                return db.query('SELECT id FROM ' + table  + ' WHERE (id = ?)', [id])
            })
            .then((result) => {
                if(result[0] == undefined)
                    reject(new Error(config.errors.noResultId))

                else
                    resolve(id)
            })
            .catch( (err) => reject(err) )

    })

}




module.exports = Adresse;