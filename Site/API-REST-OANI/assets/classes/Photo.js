const config = {
    errors : {
        //ID
        wrongValueId : "Mauvaise valeur pour id !",
        wrongTypeId : "Mauvais type pour id !",
        noResultId : "Aucun résultat pour cet id !",
        noValueId : "Pas de valeur pour id !",
        //Ordre
        wrongValueOrdre : "Mauvaise valeur pour ordre !",
        wrongTypeOrdre : "Mauvais type pour ordre !",
        noUniqueOrdre : "Valeur pour ordre déjà existante !",
        //Name
        noUniqueName : "Valeur pour name déjà existante !"
    }
}




class Photo {
    
    constructor(db){
        this.db = db
    }




    getByID(id){
        return new Promise((next) => {

            checkId(id)
                .then( (result) => {
                    id = result

                    return this.db.query("SELECT * FROM photo WHERE (id = ?)", [id])
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


    getAll(id_oeuvre){

        return new Promise( (next) => {

            if(id_oeuvre){

                checkId_oeuvre(id_oeuvre, this.db)
                    .then((result) => {
                        id_oeuvre = result

                        return this.db.query('SELECT * FROM photo WHERE (`Œuvre` = ?) ORDER BY ordre', [id_oeuvre])
                    })
                    .then( (result) => next(result) )
                    .catch( (err) => next(err) )

            }


            else{

                this.db.query('SELECT * FROM photo ORDER BY `Œuvre`, ordre')
                    .then( (result) => next(result) )
                    .catch( (err) => next(err) )

            }
            
        })

    }


    add(id_oeuvre, ordre, name){
        //Attention, ne gère pas si il y a des espaces dans le noms (à faire) => transform

        return new Promise( (next) => {
            //GESTION DE id_oeuvre
            checkId_oeuvre(id_oeuvre, this.db)
                .then( (result) => {
                    id_oeuvre = result

                    //GESTION DE ordre
                    return checkOrdre(id_oeuvre, ordre, this.db)
                })
                .then( (result) => {
                    ordre = result

                    //GESTION DE name
                    return checkName(name, this.db)
                })
                .then( (result) => {
                    name = result

                    return this.db.query('INSERT INTO photo(url, `Œuvre`, ordre) VALUES(?, ?, ?)', [name, id_oeuvre, ordre])

                })
                .then( () => {
                    return this.db.query('SELECT * FROM photo WHERE (url = ?)', [name])
                })
                .then( (result) => next(result[0]) )
                .catch( (err) => next(err) )

        })

    }


    update(id, name){

        return new Promise( (next) => {
            if(parseInt(id) != id)
                next( new Error(config.errors.wrongTypeId) )


            else if(!name || name.trim() == "")
                next( new Error(config.errors.noValueName) )
                
            
            else{
                name = name.trim()

                this.db.query('SELECT id FROM members WHERE (id = ?)', [parseInt(id)])
                    .then( (result) => {
                        if(result[0] == undefined)
                            next( new Error(config.errors.noResultId) )

                        
                        else

                            return this.db.query('SELECT name FROM members WHERE ( (name = ?) AND (id != ?))', [name, parseInt(id)])
                    })
                    .then( (result) => {
                        if(result[0] != undefined)
                            next( new Error(config.errors.noUniqueName) )


                        else

                            return this.db.query('UPDATE members SET name = ? WHERE (id = ?)', [name, parseInt(id)])
                    })
                    .then( () => next(true) )
                    .catch( (err) => next(err) )
            }

        })
    }


    delete(id){

        return new Promise( (next) => {
            
            if(parseInt(id) != id)
                next( new Error(config.errors.wrongTypeId) )

    
            else{

                this.db.query('SELECT id FROM members WHERE (id = ?)', [id])
                    .then( (result) =>{
                        if (result[0] == undefined)
                           next( new Error(config.errors.noResultId) )
            
                        
                        else

                            return this.db.query('DELETE FROM members WHERE (id = ?)', [id])    
                    })
                    .then( () => {
                        return this.db.query('SELECT * FROM members')
                    })
                    .then( (result) =>{
                        next(result)
                    })
                    .catch( (err) => next(err) )

            }
    
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


function checkId_oeuvre(id_oeuvre, db) {

    return new Promise( (resolve, reject) => {

        checkId(id_oeuvre)
            .then( (result) => {
                id_oeuvre = result;

                return db.query('SELECT id FROM `œuvre` WHERE (id = ?)', [id_oeuvre])
            })
            .then((result) => {
                if(result[0] == undefined)
                    reject(new Error(config.errors.noResultId))

                else
                    resolve(id_oeuvre)
            })
            .catch( (err) => reject(err) )

    })

}


function checkOrdre(id_oeuvre, ordre, db) {
    return new Promise( (resolve, reject) => {

        if(ordre != undefined){
            //un ordre non nul

            if(parseInt(ordre) != ordre)
                reject( new Error(config.errors.wrongTypeOrdre) )


            else if(ordre <= 0)
                reject( new Error(config.errors.wrongValueOrdre) )

            
            else{
                ordre = parseInt(ordre);

                db.query('SELECT ordre FROM photo WHERE (ordre = ?)', [ordre])
                    .then( (result) => {
                        if(result[0] != undefined)
                            reject( new Error(config.errors.noUniqueOrdre) )

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
    
};


function checkName(name, db){
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
};




module.exports = Photo;