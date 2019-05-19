const express = require("express")

const {apiCall} = require("./functions")


class Tests_router extends express.Router {

    
    constructor(){
        super()

               
        //Default

        this.route("/")
            .get((req, res) => {
                if (req.session.views) {
                    req.session.views++
                  } else {
                    req.session.views = 1
                  }
                console.log(req.session)
                res.render("tests/test_session.twig", {
                    session: req.session
                })
            })
    }

}




module.exports = Tests_router