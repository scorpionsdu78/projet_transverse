SELECT `U`.`Avatar`, `Nom d'utilisateur`, `Adresse mail`, `artiste`.`ID` 
FROM `Utilisateur` `U` 
	LEFT JOIN `Artiste` `artiste` 
	ON `U`.`ID` = `artiste`.`Utilisateur`
	
SELECT `U`.`Avatar`, `U`.`Nom d'utilisateur`, `artiste`.`Pseudo`, `U`.`Adresse mail`
FROM `Utilisateur` `U` 
	RIGHT JOIN `Artiste` `artiste` 
	ON `U`.`ID` = `artiste`.`Utilisateur`
	
SELECT `Titre`, `Auteur`, `Prix de location`
FROM `œuvre`