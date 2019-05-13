exports.checkId = (id, next) => {

    if(!id)
        next( new Error(config.errors.noValueId) )


    else if(parseInt(id) != id)
        next( new Error(config.errors.wrongTypeId) )


    else if(id <= 0)
        next( new Error(config.errors.wrongValueId) )
}