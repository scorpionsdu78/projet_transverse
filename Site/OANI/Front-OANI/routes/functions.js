const axios = require("axios")




const fetch = axios.create({
    baseURL : "http://localhost:8080/api-oani/v1"
})




exports.renderError = (res, errMes) => {
    res.render("panel admin/error.twig", {
        errorMessage : errMes
    })
}


exports.apiCall = (url, method, data, res, next) => {

    fetch({
        method : method,
        url : url,
        data : data
    })
        .then( (response) => {
            if(response.data.status == "error")
                exports.renderError(res, response.data.message)


            else
                next(response.data.result)
        })
        .catch( (err) => exports.renderError(res, err.message) )

}
