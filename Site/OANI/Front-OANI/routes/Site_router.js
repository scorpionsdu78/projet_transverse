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
                        image: "/ressources/acceuil.jpg"
                    },
                    session: req.session
                })
            })

        this.route("/%C5%93uvre")

            .get((req, res) => {

                apiCall("/oeuvre", "GET", {}, res, (result) => {
                    console.log(req.session.connexion)
                    
                    res.render("webapp/oeuvres.twig", {
                        template: {
                            title: "Œuvre",
                            active: "Œuvre",
                            image: "https://img.bfmtv.com/c/1256/708/b87/5bd3f140ad92aee49f283503f8538.jpeg"
                        },
                        session: req.session,
                        oeuvres: result
                    })

                })
            })

        this.route("/%C5%93uvre/:id")

            .get((req, res) => {

                apiCall("/oeuvre/" + req.params.id, "GET", {}, res, (result) => {
                    const photo = (result.Photos.length > 0) ? ( result.ID + "/" + result.Photos[0].URL) : "default.jpg"
                    const oeuvre = result;

                    apiCall("/artiste/" + oeuvre.Auteur, "GET", {}, res, (result) => {
						const auteur = result;
						apiCall("/commande","get",{}, res, (result) =>{
							res.render("webapp/oeuvre.twig", {
								template: {
									title: oeuvre.Titre,
									image: "/img/oeuvre/" + photo
								},
								session: req.session,
								oeuvre: oeuvre,
								auteur: auteur,
								commandes: result
							})
						})
                    })

                })
            })
			
			.post((req, res) =>{
				
				apiCall("/Adresse/admin","post",{
					pays : req.body.pays, 
                    code_postal : req.body.postal,
                    rue : req.body.adresse, 
                    numero : req.body.numero,
                    indication : req.body.complement,
					masquage : 0
				},res, (response)=>{
					apiCall("/commande","post",{
						id_acheteur : req.session.connexion.ID,
						id_oeuvre : req.params.id,
						date : req.body.debut,
						date_de_fin : req.body.fin,
						id_adresse : response.ID
					},res,(result)=>{
						res.redirect("/%C5%93uvre")
					})
				})
				
			})
				
        this.route("/artiste")

            .get((req, res) => {
    
                apiCall("/artiste", "GET", {}, res, (result) => {

                    res.render("webapp/artistes.twig", {
                        template: {
                            title: "Artiste",
                            active: "Artiste",
                            image: "http://www.pvdial.fr/blog/wp-content/uploads/2018/04/artiste.jpg"
                        },
                        session: req.session,
                        artistes: result
                    })

                })

            })

        this.route("/qui-sommes-nous")

            .get((req, res) => {
                res.render("webapp/qui-sommes-nous.twig", {
                    template: {
                        title: "Qui sommes-nous ?",
                        active: "Qui sommes-nous ?",
                        image: "/ressources/oani_logo.png"
                    },
                    session: req.session
                })
            })


        this.route("/inscription")

            .get((req, res) => {
                res.render("webapp/inscription.twig", {
                    template: {
                        title: "Inscription",
                        active: "Inscription",
                        image: "/ressources/oani_logo.png"
                    },
                    session: req.session
                })
            })
			
			.post((req, res)=> {
				
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
					console.log(result)
                    var iduser = result.ID
                    apiCall("/adresse/admin", "post", {
                        pays : req.body.pays, 
                        code_postal : req.body.postal,
                        rue : req.body.adresse, 
                        numero : req.body.numero,
                        indication : req.body.complement,
                        masquage : (req.body.masquage != undefined) ? 1 : 0
                    }, res, (result) => {
						console.log(result)
						console.log(iduser)
                        var idadresse = result.ID
                        apiCall("/adresse-utilisateur", "post", {
                            id_utilisateur : iduser,
                            id_adresse : idadresse
                        }, res, () => {
						
                            res.redirect("/")
                        })
                    })
                })
				
			})

        this.route("/connexion")

            .post((req, res) => {
                
                apiCall("/compte", "POST", {
                    nom_utilisateur: req.body.nom_utilisateur,
                    mot_de_passe: req.body.mot_de_passe
                }, res, (result) => {
                    if(result != 0){
                        req.session.connexion = {
                            ID: result.ID,
                            nom_utilisateur: result["Nom d'utilisateur"],
                            avatar: result.Avatar
                        }
                        if(result.Artiste_ID != undefined){
                            req.session.connexion.Artiste_ID = result.Artiste_ID
                        }
                    }
                    else{
                        req.session.connexion = undefined
                    }
                    
                    res.redirect("/")
                })

            })


        this.route("/d%C3%A9connexion")

            .get((req, res) => {
                req.session.connexion = undefined;
                res.redirect("/")
            })


        this.route("/profil/user/:id")

            .get((req, res) => {

                apiCall("utilisateur/" + req.params.id, "GET", {}, res, (result) => {
                    let utilisateur = result

                    if(utilisateur.Pseudo){

                        apiCall("artiste", "GET", {}, res, (result) => {
                                
                            const artistes = result
                            let bool = true

                            for(let artiste in artistes){
                                if( (artistes[artiste].Utilisateur["Nom d'utilisateur"] == utilisateur["Nom d'utilisateur"]) && (bool) ){

                                    apiCall("oeuvre?id_auteur=" + artistes[artiste].ID, "GET", {}, res, (result) => {
                                        bool = false

                                        res.render("webapp/profil.twig", {
                                            template: {
                                                title: "Profil de " + utilisateur.Pseudo,
                                                image: "https://www.artranked.com/images/d8/d89f2577b3829a0c46996c792c357862.png"
                                            },
                                            session: req.session,
                                            utilisateur: utilisateur,
                                            oeuvres: result
                                        })

                                    })
                                }
                            }
                            
                        })

                    }
                    else {
    
                        res.render("webapp/profil.twig", {
                            template: {
                                title: "Profil de " + utilisateur["Nom d'utilisateur"],
                                image: "https://www.artranked.com/images/d8/d89f2577b3829a0c46996c792c357862.png"
                            },
                            session: req.session,
                            utilisateur: utilisateur
                        })

                    }

                })

            })
			
		this.route("/profil/edit")
			.get((req,res) => {
				console.log(req.session.connexion)
				
				if(req.session.connexion == undefined)
					res.redirect("/")
				else{
					console.log(req.session.connexion)
					apiCall("/Utilisateur/"+req.session.connexion.ID, "get", {}, res, (result) => {
						res.render("webapp/profil_edit.twig",{
							session: req.session,
							utilisateur : result
						})
					})
				}
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
								
				apiCall("/utilisateur/" + req.session.connexion.ID, "put", {
                    adresse_mail : req.body.email,
                    avatar : filename,
                    description : req.body.description
					
				},res,()=>{
					res.redirect("/")
				})
			})
    }

}




module.exports = Site_router