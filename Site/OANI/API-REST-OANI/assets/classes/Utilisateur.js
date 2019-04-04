const {config, checkNumber, checkText} = require("./functions")




class Utilisateur {
    
    constructor(db){
        this.db = db
    }




    getByID(id){

        return new Promise( (next) => {
            
            checkNumber(id, "id")
                .then( (result) => {
                    id = result


                    return this.db.query("SELECT ID, `Nom d'utilisateur`, `Adresse mail`, Instagram, Avatar, Description FROM Utilisateur WHERE (id = ?)", [id])
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

            this.db.query("SELECT ID, `Nom d'utilisateur`, `Adresse mail`, Instagram, Avatar, Description FROM Utilisateur")
                .then( (result) => next(result) )
                .catch( (err) => next(err) )
            
        })

    }


    add(nom_utilisateur, mot_de_passe, adresse_mail, instagram, avatar, description){

        return new Promise( (next) => {

            checkText(nom_utilisateur, "nom d'utilisateur")
                .then( (result) => {
                    nom_utilisateur = result

                    return checkText(mot_de_passe, "mot de passe")
                })
                .then( (result) => {
                    mot_de_passe = result

                    return checkText(adresse_mail, "adresse mail")
                })
                .then( (result) => {
                    adresse_mail = result

                    return this.db("INSERT INTO utilisateur(`Nom d'utilisateur`, `Mot de passe`, `Adresse mail`, Instagram, Avatar, Description) VALUES(?, ?, ?, ?, ?, ?)")
                })
                .then( (result) => {
                    const id = result.insertId

                    return this.db("SELECT ID, `Nom d'utilisateur`, `Adresse mail`, Instagram, Avatar, Description FROM utilisateur WHERE (id = ?)", [id])
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


    update(id, name){

        return new Promise( (next) => {
            if(parseInt(id) != id)
                next( new Error(config.errors.wrongType) )


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




module.exports = Utilisateur