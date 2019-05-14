const express = require("express")

const {apiCall} = require("./functions")


class Panel_admin_router extends express.Router {

    
    constructor(){
        super()

               
        //Default
        this.route("/")

            .get((req, res) => {
                res.redirect("/panel_admin/utilisateur")
            })




        //Utilisateur
        this.route("/utilisateur")

            .get((req, res) => {
                apiCall("/utilisateur", "GET", {}, res, (result) => {
                    res.render("panel admin/utilisateur.twig", {
                        utilisateurs: result
                    })
                })
            })

            .post((req, res) =>{
                var filename

                //On voit si on a un avatar
                if(req.files){
                    var file = req.files.avatar
                    filename = req.files.avatar.name
                    //on sauvegarde sur le serveur l'avatar
                    file.mv("./public/img/avatar/"+filename, (err)=>{
                        if(err)
                            res.send(err.message)
                    })
                }
                
                //Puis on crée l'utilisateur
                apiCall("/utilisateur", "post", {
                    nom_utilisateur : req.body.inputName,
                    mot_de_passe : req.body.mot_de_passe,
                    adresse_mail : req.body.email,
                    avatar : filename,
                    description : req.body.description
                }, res, (result) => {
                    var iduser = result.ID
                    apiCall("/adresse", "post", {
                        pays : req.body.pays, 
                        code_postal : req.body.postal,
                        rue : req.body.adresse, 
                        numero : req.body.numero,
                        indication : req.body.complement,
                        masquage : (req.body.masquage != undefined) ? 1 : 0
                    }, res, (result) => {
                        var idadresse = result.ID
                        apiCall("/adresse-utilisateur", "post", {
                            id_utilisateur : iduser,
                            id_adresse : idadresse
                        }, res, () => {
                            res.redirect("/panel_admin/utilisateur/" + id_utilisateur)
                        })
                    })
                })

            });


        this.route("/utilisateur/edit")

            .get((req, res) =>{
                res.render("panel admin/utilisateur_edit.twig")
            })


        this.route("/utilisateur/edit/:id")

            .get((req, res) =>{
                apiCall("/utilisateur/admin/id/" + req.params.id, "get", {}, res, (response) => {
                        res.render("panel admin/utilisateur_edit.twig", {
                            utilisateur : response
                        })
                    })
            })
			
			.post((req,res) =>{
				
				
				var filename

                //On voit si on a un avatar
                if(req.files){
                    var file = req.files.avatar
                    filename = req.files.avatar.name
                    //on sauvegarde sur le serveur l'avatar
                    file.mv("./public/img/avatar/"+filename, (err)=>{
                        if(err)
                            res.send(err.message)
                    })
                }
								
				apiCall("/utilisateur/" + req.params.id, "put", {
                    adresse_mail : req.body.email,
                    avatar : filename,
                    description : req.body.description
					
				},res,()=>{
					res.render("panel admin/utilisateur_edit.twig")
				})
			})


        //Adresse
        this.route("/adresse")

            .get((req, res) => {
                res.render("panel admin/adresse.twig")
            })

            .post((req, res) => {

                apiCall("/adresse","post",{
                    pays : req.body.pays, 
                    code_postal : req.body.postal,
                    rue : req.body.adresse, 
                    numero : req.body.numero,
                    indication : req.body.complement,
                    masquage : (req.body.masquage != undefined) ? 1 : 0
                },res,()=>{
                        res.redirect("/panel_admin/adresse")
                })

            })




        //Artiste
        this.route("/artiste")

            .get((req, res) => {

                apiCall("/artiste", "GET", {}, res, (response) => {
                    res.render("panel admin/artiste.twig", {
                        artiste: response
                    })
                })

            })




        //Oeuvre
        this.route("/%C5%93uvre/edit")

            .get((req, res) => {
                res.render("panel admin/œuvre.twig")
            })

    }

}




module.exports = Panel_admin_router