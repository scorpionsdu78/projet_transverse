let config;




class Utilisateur {
    
    constructor(db){
        this.db = db
    }




    getByID(id){
        return new Promise((next) => {
            if(parseInt(id) != id)
                next( new Error(config.errors.wrongTypeId) )


            else if(id <= 0)
                next( new Error(config.errors.wrongValueId) )


            else{
                this.db.query("SELECT * FROM Utilisateur WHERE (id = ?)", [parseInt(id)])
                    .then( (result) => {
                        if(result[0] == undefined)
                            next( new Error(config.errors.noResultId) )

                        else
                            next(result[0])
                    })

                    .catch( (err) => next(err) )
            }

        })
    }


    getAll(){

        return new Promise( (next) => {

            this.db.query(`SELECT * FROM Utilisateur`)
                .then( (result) => next(result) )
                .catch( (err) => next(err) )
            
        })

    }


    add(id_oeuvre, name){

        return new Promise( (next) => {
                
            if(!name || name.trim() == "")
                name = new Date().getTime()


            else{
                name = name.trim()

                this.db.query('SELECT url FROM Utilisateur WHERE url = ?', [name])
                    .then( (result) => {
                        if(result[0] != undefined)
                            next( new Error(config.errors.noUniqueName) )
                    })
                    .catch( (err) => next(err) )
            }

            this.db.query('INSERT INTO Utilisateur(url, `Œuvre`) VALUES(?, ?)', [name, id_oeuvre])
                    .then( () => {
                        return this.db.query('SELECT * FROM Utilisateur WHERE url = ?', [name])
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




module.exports = (_config) => {
    config = _config


    return Utilisateur
}