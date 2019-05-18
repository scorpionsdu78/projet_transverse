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
                    apiCall("/adresse/admin", "post", {
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
                res.render("panel admin/utilisateur_edit.twig", {
					new : 1
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
						
                            res.redirect("/panel_admin/utilisateur/edit/" + iduser)
                        })
                    })
                })

            });




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
                        artistes: response
                    })
                })

            })


		this.route("/artiste/edit")
			
			.get((req,res) => {
				apiCall("/utilisateur", "GET", {}, res, (response) => {
					res.render("panel admin/artiste_edit.twig", {
						Users : response
					})
				})
			})
			
			.post((req,res) =>{
				let user = req.body.User
				console.log(user)
				
				apiCall("/Artiste", "post", {
					id_utilisateur : user,
					pseudo : req.body.pseudo
				}, res, ()=>{
					res.redirect("/panel_admin/artiste")
				})
			})
			
		this.route("/artiste/edit/:id")
		
			.get((req,res) => {
				console.log(req.params.id)
				apiCall("/artiste/admin/id/" + req.params.id, "get",{}, res, (response) =>{
					console.log(response)
					res.render("panel admin/artiste_edit.twig",{
						Artiste : response
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
				console.log(req.body.id)
				apiCall("/artiste/"+req.params.id, "put",{
					pseudo : req.body.pseudo
				},res,()=>{
					let id = req.body.id 
					console.log(id)
					apiCall("/utilisateur/" + id, "put", {
						adresse_mail : req.body.email,
						avatar : filename,
						description : req.body.description
					
					},res,()=>{
						res.render("panel admin/utilisateur_edit.twig")
					})
				})
			})
		
		this.route("/artiste/delete")
		
		
			.post((req,res) =>{
				
				console.log(req.body.id)

				
				apiCall("/artiste/" + req.body.id,"delete", {}, res, ()=>{
					
					res.redirect("/panel_admin/artiste")
				})
			})
			
        //Oeuvre
        this.route("/%C5%93uvre/edit")

            .get((req, res) => {
				
				apiCall("/artiste", "get", {}, res, (artistes) =>{
					console.log(artistes)
					res.render("panel admin/œuvre_edit.twig", {
						artistes : artistes
					})
				})
            })
			
			.post((req, res) => {
				
				var id
				
				
				apiCall("/adresse/admin", "post", {
					pays : req.body.pays, 
					code_postal : req.body.postal,
					rue : req.body.adresse, 
					numero : req.body.numero,
					indication : req.body.complement,
					masquage : (req.body.masquage != undefined) ? 1 : 0
				}, res, (result) =>{
					id = result.ID
					apiCall("/Oeuvre", "post", {
						titre : req.body.nom,
						id_auteur : req.body.artiste,
						description : req.body.description,
						prix : req.body.prix,
						id_adresse : id
					
					}, res, (resolve)=>{
						let id = resolve.ID
						console.log(id)
						let tags = req.body.tags
						tags = tags.split(",")
						console.log(tags)
						new Promise( (resolve,reject) =>{
							let i=0
							tags.forEach( async(tag) =>{
								await apiCall("/Tag","post",{
									id_oeuvre : id,
									tag : tag
									
								},res,(result)=>{
									if(result instanceof Error)
										reject(result)
									if(++i == tags.length)
                                        resolve(tags)
								})
							})
							
						})
						.then(
							()=>{
								var filename
								var fs = require('fs')

							//On voit si on a un avatar
								if(req.files){
									var file = req.files.photo1
									filename = req.files.photo1.name
									//on sauvegarde sur le serveur l'avatar
									fs.mkdir("./public/img/oeuvre/"+id,()=>{
										file.mv("./public/img/oeuvre/"+id+"/"+filename, (err)=>{
											if(err)
												res.send(err.message)
										})
										apiCall("/Photo","post",{
											id_oeuvre : id,
											ordre : "1",
											name : filename
										},res,()=>{
											res.render("panel admin/œuvre.twig")
										})
									})
								}
							}
							
						)
						.catch( (err) => res.redirect("error.twig", {err}))
						
					})
					
				})
				
			})
			
		this.route("/%C5%93uvre")
			
			.get((req,res)=>{
				apiCall("/oeuvre","get",{},res,(oeuvres)=>{
					let oeuvres1 = oeuvres
					apiCall("/artiste","get",{},res,(artistes)=>{
						res.render("panel admin/œuvre.twig",{
							oeuvres : oeuvres1,
							artistes : artistes 
						})
					})
				})
			})
			
    }

}




module.exports = Panel_admin_router