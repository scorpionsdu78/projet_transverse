const express = require("express")

const {apiCall} = require("./functions")


class Site_router extends express.Router {

    
    constructor(){
        super()

               
        //Default

        this.route("/")
            .get((req, res) => {
                res.redirect("/acceuil")
            })

        this.route("/acceuil")

            .get((req, res) => {
                res.render("webapp/acceuil.twig", {
                    template: {
                        title: "Acceuil",
                        active: "Acceuil",
                        image: "/ressources/oani_logo.png"
                    }
                })
            })

        this.route("/%C5%93uvre")

            .get((req, res) => {

                apiCall("/oeuvre", "GET", {}, res, (result) => {
                    
                    res.render("webapp/oeuvre.twig", {
                        template: {
                            title: "Œuvre",
                            active: "Œuvre",
                            image: "https://img.bfmtv.com/c/1256/708/b87/5bd3f140ad92aee49f283503f8538.jpeg"
                        },
                        oeuvres: result
                    })

                })
            })

        this.route("/artiste")

            .get((req, res) => {
                res.render("webapp/artiste.twig", {
                    template: {
                        title: "Artiste",
                        active: "Artiste",
                        image: "http://www.pvdial.fr/blog/wp-content/uploads/2018/04/artiste.jpg"
                    }
                })
            })

        this.route("/qui-sommes-nous")

            .get((req, res) => {
                res.render("webapp/qui-sommes-nous.twig", {
                    template: {
                        title: "Qui sommes-nous ?",
                        active: "Qui sommes-nous ?",
                        image: "/ressources/oani_logo.png"
                    }
                })
            })

        this.route("/connexion")

            .get((req, res) => {
                res.render("webapp/connexion.twig", {
                    template: {
                        title: "Connexion",
                        active: "Connexion",
                        image: "/ressources/oani_logo.png"
                    }
                })
            })

        this.route("/inscription")

            .get((req, res) => {
                res.render("webapp/inscription.twig", {
                    template: {
                        title: "Inscription",
                        active: "Inscription",
                        image: "/ressources/oani_logo.png"
                    }
                })
            })

    }

}




module.exports = Site_router