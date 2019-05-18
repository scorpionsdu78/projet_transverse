exports.config = {
    errors : {
        wrongValue : "Mauvaise valeur pour ",
        wrongType : "Mauvais type pour ",
        noResult : "Aucun résultat pour ",
        noValue : "Pas de valeur pour ",
        noUnique : "Valeur déjà existante pour "
    }
}



exports.checkNumber = (num, label) => {

    return new Promise( (resolve, reject) => {

        if(!num)
            reject( new Error(exports.config.errors.noValue + label + " !") )
    
    
        else if(parseInt(num) != num)
            reject( new Error(exports.config.errors.wrongType + label + " !") )
    
    
        else if(num <= 0)
            reject( new Error(exports.config.errors.wrongValue + label + " !") )

        
        resolve(parseInt(num))

    })

}


exports.checkExistingId = (id, table, db) => {

    return new Promise( (resolve, reject) => {

        if(!id)
            reject( new Error(exports.config.errors.noValue + "id" + " !") )
    
    
        else if(parseInt(id) != id)
            reject( new Error(exports.config.errors.wrongType + "id" + " !") )
    
    
        else if(id <= 0)
            reject( new Error(exports.config.errors.wrongValue + "id" + " !") )
    
        id = parseInt(id)

        db.query('SELECT id FROM `' + table  + '` WHERE (id = ?)', [id])
            .then((result) => {
                if(result[0] == undefined)
                    reject(new Error(exports.config.errors.noResult + table + " !"))

                else
                    resolve(id)
            })
            .catch( (err) => reject(err) )

    })

}


exports.checkBoolean = (bool, label) => {

    return new Promise( (resolve, reject) => {

        if(bool == undefined)
            reject( new Error(exports.config.errors.noValue + label + " !") )
    
    
        else if(parseInt(bool) != bool)
            reject( new Error(exports.config.errors.wrongType + label + " !") )
    
    
        else if( (bool < 0) || (bool > 1) ) 
            reject( new Error(exports.config.errors.wrongValue + label + " !") )
    
        resolve(parseInt(bool))

    })

}


exports.checkAndChangeOrdre = (id_oeuvre, ordre, db) => {
    return new Promise( (resolve, reject) => {

        if(ordre != undefined){
            //un ordre non nul
        
            if(!ordre || ordre.trim() == "")
                reject( new Error(exports.config.errors.noValue + "ordre" + " !"))

            
            else{
                ordre = ordre.trim()
        
                db.query('SELECT ordre FROM photo WHERE ( (ordre = ?) AND (`Œuvre` = ?) )', [ordre, id_oeuvre])
                    .then( (result) => {
                        if(result[0] != undefined)
                            reject( new Error(exports.config.errors.noUnique + "ordre" + " !") )

                        else
                            resolve(ordre)
                    })
                    .catch( (err) => reject(err) )
            }
            
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


exports.checkText = (text, label) => {
    
    return new Promise( (resolve, reject) => {
        
        if(!text || text.trim() == ""){
            reject( new Error(exports.config.errors.noValue + label + " !"))
        }

        
        else
            resolve(text.trim())
    })
}


exports.checkTag = (tag, id_oeuvre, db) => {
    return new Promise( (resolve, reject) => {
        
        if(!tag || tag.trim() == "")
            reject( new Error(exports.config.errors.noValue + "tag" + " !") )


        else{
            tag = tag.trim()

            db.query('SELECT tag FROM tag WHERE ( (tag = ?) AND (`Œuvre` = ?) )', [tag, id_oeuvre])
                .then( (result) => {
                    if(result[0] != undefined)
                        reject( new Error(exports.config.errors.noUnique + "tag" + " !") )

                    else
                        resolve(tag)
                })
                .catch( (err) => reject(err) )
        }

    })
}


exports.checkTagCouleur = (tag, id_oeuvre, db) => {
    return new Promise( (resolve, reject) => {
        
        if(!tag || tag.trim() == "")
            reject( new Error(exports.config.errors.noValueTag + "tag couleur" + " !") )


        else{
            tag = tag.trim()

            db.query('SELECT tag FROM `tag couleur` WHERE ( (tag = ?) AND (`Œuvre` = ?) )', [tag, id_oeuvre])
                .then( (result) => {
                    if(result[0] != undefined)
                        reject( new Error(exports.config.errors.noUnique + "tag couleur" + " !") )

                    else
                        resolve(tag)
                })
                .catch( (err) => reject(err) )
        }

    })
}