const {config, checkNumber, checkExistingId, checkTag} = require("./functions")




class Tag {
    
    constructor(db){
        this.db = db
    }




    getByID(id){
        return new Promise((next) => {

            checkNumber(id, "id")
                .then( (result) => {
                    id = result

                    return this.db.query("SELECT * FROM tag WHERE (id = ?)", [id])
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

                checkExistingId(id_oeuvre, "Œuvre", this.db)
                    .then((result) => {
                        id_oeuvre = result

                        return this.db.query('SELECT * FROM tag WHERE (`Œuvre` = ?)', [id_oeuvre])
                    })
                    .then( (result) => next(result) )
                    .catch( (err) => next(err) )

            }


            else{

                this.db.query('SELECT * FROM tag ORDER BY `Œuvre`')
                    .then( (result) => next(result) )
                    .catch( (err) => next(err) )

            }
            
        })

    }


    add(tag, id_oeuvre){

        return new Promise( (next) => {
            //GESTION DE id_oeuvre
            checkExistingId(id_oeuvre, `œuvre`, this.db)
                .then( (result) => {
                    id_oeuvre = result

                    return checkTag(tag, id_oeuvre, this.db)
                })
                .then( (result) => {
                    tag = result

                    return this.db.query('INSERT INTO tag(tag, `Œuvre`) VALUES(?, ?)', [tag, id_oeuvre])

                })
                .then( () => {
                    return this.db.query('SELECT * FROM tag WHERE (tag = ?)', [tag])
                })
                .then( (result) => next(result[0]) )
                .catch( (err) => next(err) )

        })

    }


    delete(id){

        return new Promise( (next) => {
            
            checkExistingId(id, "tag", this.db)
                .then( (result) =>{
                    id = result

                    return this.db.query('DELETE FROM tag WHERE (id = ?)', [id])    
                })
                .then( () => {
                    return this.db.query('SELECT * FROM tag ORDER BY `Œuvre`')
                })
                .then( (result) =>{
                    next(result)
                })
                .catch( (err) => next(err) )
    
        })
    }

}




module.exports = Tag;