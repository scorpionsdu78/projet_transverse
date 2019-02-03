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


CREATE TABLE `oani`.`Commande` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la commande',
	`Vendeur` INT(11) NOT NULL COMMENT 'ID utilisateur du vendeur',
	`Acheteur` INT(11) NOT NULL COMMENT 'ID utilisateur de l\'acheteur',
	`Œuvre` INT(11) NOT NULL COMMENT 'ID de l\'oeuvre',
	`Etat` VARCHAR(32) NOT NULL COMMENT 'Etat de la commande (en cours, réservée, archivée,...)',
	`Date de commande` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date au moment où la commande a été passée',
	`Date` TIMESTAMP NOT NULL COMMENT 'Date du début de la location',
	`Date de fin` TIMESTAMP NOT NULL COMMENT 'Date de la fin de la location',
	`Localisation` INT(11) NOT NULL COMMENT 'La localisation de l\'oeuvre pendant la location',
	`Masquage` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Si on souhaite cacher la localisation',
	PRIMARY KEY (`ID`)
) ENGINE = InnoDB COMMENT = 'Description des commandes de location';