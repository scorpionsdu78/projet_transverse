exports.sorting = (json_object, key_to_sort_by, type) => {
    function sortByKey(a, b, type) {
        var x = a[key_to_sort_by]
        var y = b[key_to_sort_by]
        
        result = ((x < y) ? -1 : ((x > y) ? 1 : 0))

        if(type == "DESC"){
            result *= -1
        }

        return result;
    }

    json_object.sort(sortByKey, type);
}


exports.checkId = (id, next) => {

    if(!id)
        next( new Error(config.errors.noValueId) )


    else if(parseInt(id) != id)
        next( new Error(config.errors.wrongTypeId) )


    else if(id <= 0)
        next( new Error(config.errors.wrongValueId) )
}