CREATE DATABASE `OANI`;

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
	`Utilisateur` INT(11) NOT NULL COMMENT 'ID de son compte utilisateur',
	`Pseudo` VARCHAR(32) NOT NULL COMMENT 'Pseudo de l\'artiste',
	PRIMARY KEY (`ID`),
	FOREIGN KEY (`Utilisateur`) REFERENCES `Utilisateur`(`ID`),
	UNIQUE (`Utilisateur`)
)ENGINE = InnoDB COMMENT = 'Compte artiste';


CREATE TABLE `oani`.`Adresse` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l\'adresse',
	`Pays` VARCHAR(32) NOT NULL,
	`Code Postal` VARCHAR(16) NOT NULL,
	`Rue` TINYTEXT NULL,
	`Numéro de rue` VARCHAR(16) NULL,
	`Indications Complémentaires` TINYTEXT NULL COMMENT 'Tout autres informations sur l’adresse (Numéro de l’étage, Numéro d’appartement, …)',
	`Masquage` BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Si on souhaite cacher l\'adresse',
	PRIMARY KEY (`ID`)
) ENGINE = InnoDB COMMENT = 'Adresses générale';


CREATE TABLE `oani`.`Adresse d'utilisateur` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de l\'adresse d\'utilisateur',
	`Utilisateur` INT(11) NOT NULL COMMENT 'ID de l\'utilisateur',
	`Adresse` INT(11) NOT NULL COMMENT 'ID de l\'adresse',
	PRIMARY KEY (`ID`),
	FOREIGN KEY (`Utilisateur`) REFERENCES `Utilisateur`(`ID`),
	FOREIGN KEY (`Adresse`) REFERENCES `Adresse`(`ID`),
	UNIQUE (`Adresse`),
	UNIQUE (`Utilisateur`,`Adresse`)
) ENGINE = InnoDB COMMENT = 'Adresses des utilisateurs';


CREATE TABLE `oani`.`Œuvre` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la l\'œuvre',
	`Titre` TINYTEXT NOT NULL,
	`Auteur` INT NOT NULL COMMENT 'ID utilisateur de l\’auteur',
	`Description` TEXT NULL COMMENT 'Informations sur l\'œuvre',
	`Prix de location` DOUBLE(11,2) NOT NULL COMMENT 'Le prix de location de l\'œuvre à la journée',
	`Localisation` INT NOT NULL COMMENT 'ID Adresse de l\'emplacement actuel du produit',
	PRIMARY KEY (`ID`),
	FOREIGN KEY (`Auteur`) REFERENCES `Artiste`(`ID`),
	FOREIGN KEY (`Localisation`) REFERENCES `Adresse`(`ID`)
) ENGINE = InnoDB;


CREATE TABLE `oani`.`Commande` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la commande',
	`Acheteur` INT(11) NOT NULL COMMENT 'ID utilisateur de l\'acheteur',
	`Œuvre` INT(11) NOT NULL COMMENT 'ID de l\'oeuvre',
	`Etat` VARCHAR(32) NOT NULL COMMENT 'Etat de la commande (en cours, réservée, archivée,...)',
	`Date de commande` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date au moment où la commande a été passée',
	`Date` TIMESTAMP NOT NULL COMMENT 'Date du début de la location',
	`Date de fin` TIMESTAMP NOT NULL COMMENT 'Date de la fin de la location',
	`Localisation` INT(11) NOT NULL COMMENT 'La localisation de l\'oeuvre pendant la location',
	PRIMARY KEY (`ID`),
	FOREIGN KEY (`Acheteur`) REFERENCES `Utilisateur`(`ID`),
	FOREIGN KEY (`Œuvre`) REFERENCES `Œuvre`(`ID`),
	FOREIGN KEY (`Localisation`) REFERENCES `Adresse`(`ID`),
	UNIQUE (`Œuvre`,`Date de commande`),
	UNIQUE (`Œuvre`,`Date de fin`)
) ENGINE = InnoDB COMMENT = 'Description des commandes de location';


CREATE TABLE `oani`.`Photo` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la photo',
	`URL` VARCHAR(128) NOT NULL COMMENT 'URL vers la photo sur le serveur',
	`Œuvre` INT(11) NOT NULL COMMENT 'ID Œuvre de la photo',
	`ordre` INT(11) NOT NULL COMMENT 'ordre d\'apparition de la photo pour l\'oeuvre',
	PRIMARY KEY (`ID`),
	FOREIGN KEY (`Œuvre`) REFERENCES `Œuvre`(`ID`),
	UNIQUE (`URL`),
	UNIQUE (`Œuvre`,`ordre`)
) ENGINE = InnoDB COMMENT = 'Photos des œuvres';


CREATE TABLE `oani`.`Tag` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID du tag',
	`Tag` VARCHAR(128) NOT NULL COMMENT 'Tag relié à l\’œuvre',
	`Œuvre` INT(11) NOT NULL COMMENT 'ID Œuvre du tag',
	PRIMARY KEY (`ID`),
	FOREIGN KEY (`Œuvre`) REFERENCES `Œuvre`(`ID`),
	UNIQUE (`Œuvre`,`Tag`)
) ENGINE = InnoDB COMMENT = 'Tags des œuvres';


CREATE TABLE `oani`.`Tag Couleur` (
	`ID` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID du tag couleur',
	`Tag` VARCHAR(128) NOT NULL COMMENT 'Code couleur HTML relié à l\’œuvre',
	`Œuvre` INT(11) NOT NULL COMMENT 'ID Œuvre du tag couleur',
	PRIMARY KEY (`ID`),
	FOREIGN KEY (`Œuvre`) REFERENCES `Œuvre`(`ID`),
	UNIQUE (`Œuvre`,`Tag`)
) ENGINE = InnoDB COMMENT = 'Tags couleur des œuvres';




CREATE VIEW `oani`.`Compte view` AS
	SELECT u.ID, u.`Nom d'utilisateur`, PASSWORD(u.`Mot de passe`) AS `Mot de passe`, u.Avatar, a.ID AS "Artiste_ID" FROM `oani`.`Utilisateur` u
		LEFT JOIN artiste a ON a.Utilisateur = u.ID;
