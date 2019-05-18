exports.success = (result) => {
    return {
        status : "success",
        result : result
    }
}


exports.error = (errMessage) => {
    return {
        status : "error",
        message : errMessage
    }
}


exports.checkAndChange = (obj) => {
    return (obj instanceof Error) ? this.error(obj.stack) : this.success(obj)
}