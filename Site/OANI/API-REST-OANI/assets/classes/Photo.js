const {config, checkNumber, checkExistingId, checkAndChangeOrdre} = require("./functions")



class Photo {
    
    constructor(db){
        this.db = db
    }




    getByID(id){
        return new Promise((next) => {

            checkNumber(id, "id")
                .then( (result) => {
                    id = result

                    return this.db.query("SELECT * FROM photo WHERE (id = ?)", [id])
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


    getAll(id_oeuvre){

        return new Promise( (next) => {

            if(id_oeuvre){

                checkExistingId(id_oeuvre, "Œuvre", this.db)
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
            checkExistingId(id_oeuvre, `œuvre`, this.db)
                .then( (result) => {
                    id_oeuvre = result

                    //GESTION DE ordre
                    return checkAndChangeOrdre(id_oeuvre, ordre, this.db)
                })
                .then( (result) => {
                    ordre = result

                    //GESTION DE name
                    return new Promise( (resolve, reject) => {
                        if(!name || name.trim() == "")
                            resolve(new Date().getTime())
    
    
                        else{
                            name = name.trim()
            
                            db.query('SELECT url FROM photo WHERE url = ?', [name])
                                .then( (result) => {
                                    if(result[0] != undefined)
                                        reject( new Error(config.errors.noUnique + "name" + " !") )
            
                                    else
                                        resolve(name)
                                })
                                .catch( (err) => reject(err) )
                        }

                    })
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


    update(id, ordre){

        return new Promise( (next) => {
            checkExistingId(id, "photo", this.db)
                .then( (result) => {
                    id = result;

                    return checkNumber(ordre, "ordre")
                })
                .then( (result) => {
                    ordre = result

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




module.exports = Photo;