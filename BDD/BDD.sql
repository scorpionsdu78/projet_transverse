CREATE TABLE `OANI`.`Utilisateur` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID Utilisateur',
	`Nom d'utilisateur` VARCHAR(32) NOT NULL,
	`Mot de passe` VARCHAR(64) NOT NULL,
	`Adresse mail` VARCHAR(32) NOT NULL,
	`Instagram` VARCHAR(32) COMMENT 'Pseudo instagram',
	`Avatar` VARCHAR(128) COMMENT 'URL de l\'avatar du compte',
	`Description` TEXT COMMENT 'Description de l\'utilisateur',
	PRIMARY KEY (`ID`),
	UNIQUE (`Nom d'utilisateur`),
	UNIQUE (`Adresse mail`),
	UNIQUE (`Avatar`)
)ENGINE = InnoDB COMMENT = 'Compte utilisateur';


CREATE TABLE `oani`.`Artiste` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l\'artiste',
	`ID Utilisateur` INT(11) NOT NULL COMMENT 'ID de son compte utilisateur',
	`Pseudo` VARCHAR(32) NOT NULL COMMENT 'Pseudo de l\'artiste',
	PRIMARY KEY (`ID`)
)ENGINE = InnoDB COMMENT = 'Compte artiste';


CREATE TABLE `oani`.`Adresse` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l\'adresse',
	`ID Utilisateur` INT(11) NOT NULL COMMENT 'ID de l\'utilisateur',
	`Pays` VARCHAR(32) NOT NULL , `Code Postal` VARCHAR(16) NOT NULL,
	`Rue` TINYTEXT NULL , `Numéro de rue` VARCHAR(16) NULL,
	`Indications Complémentaires` TINYTEXT NULL COMMENT 'Tout autres informations sur l’adresse (Numéro de l’étage, Numéro d’appartement, …)',
	PRIMARY KEY (`ID`)
) ENGINE = InnoDB COMMENT = 'Adresses des utilisateurs';