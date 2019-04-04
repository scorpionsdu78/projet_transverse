exports.config = {
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
        //Ordre
        wrongValueOrdre : "Mauvaise valeur pour ordre !",
        wrongTypeOrdre : "Mauvais type pour ordre !",
        noValueOrdre : "Pas de valeur pour ordre !",
        noUniqueOrdre : "Valeur pour ordre déjà existante !",
        //Name
        noUniqueName : "Valeur pour name déjà existante !",
        //Tag
        noValueTag : "Pas de valeur pour tag !",
        noUniqueTag : "Valeur pour tag déjà existante !"
    }
}



exports.checkId = (id) => {

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


exports.checkExistingId = (id, table, db) => {

    return new Promise( (resolve, reject) => {

        checkId(id)
            .then( (result) => {
                id = result;

                return db.query('SELECT id FROM `' + table  + '` WHERE (id = ?)', [id])
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


exports.checkNumber = (num) => {

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


exports.checkMasquage = (bool) => {

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


exports.checkOrdre = (ordre) => {
    return new Promise( (resolve, reject) =>{

        if(!ordre)
            reject( new Error(config.errors.noValueOrdre) )


        else if(parseInt(ordre) != ordre)
            reject( new Error(config.errors.wrongTypeOrdre) )


        else if(ordre <= 0)
            reject( new Error(config.errors.wrongValueOrdre) )

        
        resolve(parseInt(ordre));
    })
}


exports.checkAndChangeOrdre = (id_oeuvre, ordre, db) => {
    return new Promise( (resolve, reject) => {

        if(ordre != undefined){
            //un ordre non nul
            checkOrdre(ordre)
            .then( (result) => {
                ordre = result
    
                return db.query('SELECT ordre FROM photo WHERE (ordre = ?)', [ordre])
            })
            .then( (result) => {
                if(result[0] != undefined)
                    reject( new Error(config.errors.noUniqueOrdre) )

                else
                    resolve(ordre)
            })
            .catch( (err) => reject(err) )
            
        }


        else{
            //l'ordre doit être déterminé car il est nul

            db.query('SELECT MAX(ordre) FROM photo WHERE (`œuvre` = ?)', [id_oeuvre])
                .then( (result) => {
                    resolve(parseInt(result[0]["MAX(ordre)"] + 1))
                })
                .catch( (err) => reject(err) )
        }

    })
    
}


exports.checkName = (name, db) => {
    return new Promise( (resolve, reject) => {
        
        if(!name || name.trim() == "")
            resolve(new Date().getTime())


        else{
            name = name.trim()

            db.query('SELECT url FROM photo WHERE url = ?', [name])
                .then( (result) => {
                    if(result[0] != undefined)
                        reject( new Error(config.errors.noUniqueName) )

                    else
                        resolve(name)
                })
                .catch( (err) => reject(err) )
        }

    })
}


exports.checkTag = (tag, id_oeuvre, db) => {
    return new Promise( (resolve, reject) => {
        
        if(!tag || tag.trim() == "")
            reject( new Error(config.errors.noValueTag) )


        else{
            tag = tag.trim()

            db.query('SELECT tag FROM `tag couleur` WHERE ( (tag = ?) AND (`Œuvre` = ?) )', [tag, id_oeuvre])
                .then( (result) => {
                    if(result[0] != undefined)
                        reject( new Error(config.errors.noUniqueTag) )

                    else
                        resolve(tag)
                })
                .catch( (err) => reject(err) )
        }

    })
}