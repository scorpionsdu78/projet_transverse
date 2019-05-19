--
-- Déchargement des données de la table `adresse`
--

INSERT INTO `adresse` (`ID`, `Pays`, `Code Postal`, `Rue`, `Numéro de rue`, `Indications Complémentaires`, `Masquage`) VALUES
(1, 'France', '95132', 'Rue del sal', '9', 'non', 0),
(2, 'France', '95232', 'Rue deal', '8', 'non', 0),
(3, 'France', '95202', 'Rue dez dal', '30', 'non', 0),
(4, 'France', '95402', 'Rue dez dal', '340', 'non', 0),
(5, 'France', '95702', 'Rue dez dal', '370', 'non', 0),
(6, 'France', '91202', 'Rue dez dal', '130', 'non', 0),
(7, 'France', '91000', 'Avenue akaboomba', '69', NULL, 1),
(8, 'France', '91000', 'Avenue aiheih', '69', NULL, 1),
(9, 'France', '91000', 'Avenue frutal', '9', NULL, 0),
(10, 'France', '9000', 'Avenue frutal', '19', NULL, 0),
(11, 'France', '1000', 'Avenue dops', '959', NULL, 0),
(12, 'France', '91850', 'Rue tork', '859', NULL, 0),
(13, 'France', '71000', 'Avenue eih', '9', NULL, 1),
(14, 'France', '91600', 'Avenue fral', '14', NULL, 0),
(15, 'France', '9065', 'Avenue koka', '19', NULL, 0),
(16, 'France', '18000', 'Avenue dupond', '959', NULL, 0),
(17, 'France', '91850', 'Rue kobert', '56', NULL, 0),
(18, 'France', '77014', 'Place du 22 Novembre 1943', '2', NULL, 0),
(19, 'France', '77013', 'Place des 44 enfants d\'Izieu', '5', NULL, 0),
(20, 'France', '77016', 'Place du 8 Février 1962', '5', NULL, 0),
(21, 'France', '77016', 'Rue du 8 mai 1945', '6', NULL, 0),
(22, 'France', '77018', 'la rue Blanche ', '8', NULL, 0),
(23, 'France', '77012', 'Allée Adrienne-Lecouvreur', '2', NULL, 0),
(24, 'France', '77011', 'Esplanade du 9 novembre 1989', '11', NULL, 0),
(25, 'France', '77065', 'Rue de l\'Abbaye', '65', NULL, 0),
(26, 'France', '77018', 'Place de l\'Abbé-Basset', '5', NULL, 0),
(27, 'France', '77015', 'Rue de l\'Abbé-Carton', '8', NULL, 0),
(28, 'France', '77014', 'Rue de l\'Abbé-de-l\'Épée', '3', NULL, 0),
(29, 'France', '77013', 'Place de l\'Abbé-Franz-Stock', '4', NULL, 0),
(30, 'France', '77015', 'Place de l\'Abbé-Georges-Hénocque', '9', NULL, 0),
(31, 'France', '77018', 'Rue de l\'Abbé-Gillet', '9', NULL, 0),
(32, 'France', '77014', 'Rue de l\'Abbé-Grégoire', '6', NULL, 0);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `adresse d'utilisateur`
--

INSERT INTO `adresse d'utilisateur` (`ID`, `Utilisateur`, `Adresse`) VALUES
(1, 1, 1),
(2, 3, 2),
(3, 4, 3),
(4, 5, 4),
(5, 6, 5),
(6, 7, 6),
(7, 8, 7),
(8, 9, 8),
(9, 10, 9),
(10, 11, 10),
(11, 12, 11),
(12, 13, 12),
(13, 14, 13),
(14, 15, 14),
(15, 16, 15),
(16, 17, 16),
(17, 18, 17);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `artiste`
--

INSERT INTO `artiste` (`ID`, `Utilisateur`, `Pseudo`) VALUES
(1, 1, 'TC99'),
(2, 3, 'BOB86');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `photo`
--

INSERT INTO `photo` (`ID`, `URL`, `Œuvre`, `ordre`) VALUES
(1, 'localhost:8081/img/oeuvre/1/1.0.jpg', 1, 1),
(25, 'localhost:8081/img/oeuvre/1/1.1.jpg', 1, 2),
(50, 'localhost:8081/img/oeuvre/3/3.0.jpg', 3, 1),
(73, 'localhost:8081/img/oeuvre/3/3.1.jpg', 3, 2),
(74, 'localhost:8081/img/oeuvre/3/3.2.jpg', 3, 3),
(75, 'localhost:8081/img/oeuvre/4/4.0.jpg', 4, 1),
(76, 'localhost:8081/img/oeuvre/4/4.1.jpg', 4, 2),
(77, 'localhost:8081/img/oeuvre/4/4.2.jpg', 4, 3),
(95, 'localhost:8081/img/oeuvre/5/5.0.jpg', 5, 1),
(96, 'localhost:8081/img/oeuvre/5/5.1.jpg', 5, 2),
(97, 'localhost:8081/img/oeuvre/5/5.2.jpg', 5, 3),
(98, 'localhost:8081/img/oeuvre/7/7.0.jpg', 7, 1),
(99, 'localhost:8081/img/oeuvre/7/7.1.jpg', 7, 2),
(100, 'localhost:8081/img/oeuvre/7/7.2.jpg', 7, 3),
(101, 'localhost:8081/img/oeuvre/8/8.0.jpg', 8, 1),
(102, 'localhost:8081/img/oeuvre/8/8.1.jpg', 8, 2),
(103, 'localhost:8081/img/oeuvre/8/8.2.jpg', 8, 3),
(104, 'localhost:8081/img/oeuvre/9/9.0.jpg', 9, 1),
(105, 'localhost:8081/img/oeuvre/10/10.0.jpg', 10, 1),
(106, 'localhost:8081/img/oeuvre/11/11.0.jpg', 11, 1),
(107, 'localhost:8081/img/oeuvre/12/12.0.jpg', 12, 1),
(111, 'localhost:8081/img/oeuvre/14/14.0.jpg', 14, 1),
(112, 'localhost:8081/img/oeuvre/15/15.0.jpg', 15, 1);

-- --------------------------------------------------------

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`ID`, `Nom d'utilisateur`, `Mot de passe`, `Adresse mail`, `Instagram`, `Avatar`, `Description`) VALUES
(1, 'topcasedu99', 'dsqdxc7', 'topcasedu99@gmail.com', 'topcasedu_99', 'localhost:8081/img/avatar/7d4ce918810525a5c8c097c8cf2be9c7.jpg', 'non'),
(3, 'Lurggar', 'dsqdxc7', 'Lurggar@gmail.com', 'Lurggar_79', 'localhost:8081/img/avatar/499496.jpg', 'Artiste de grand envergure'),
(4, 'Trulith', 'dsqdxc7', 'Trulith@gmail.com', 'Trulith_34', 'localhost:8081/img/avatar/16730488_1168378756593975_7162810654086681616_n.jpg', 'Artiste de grand envergure'),
(5, 'Moatdon', 'dsqdxc7', 'Moatdon@gmail.com', 'Moatdon_21', 'localhost:8081/img/avatar/17265085_10155224871087941_2719979986532961305_n.jpg', 'Artiste de grand envergure'),
(6, 'Urukrod', 'dsqdxc7', 'Urukrod@gmail.com', 'Urukrod_76', 'localhost:8081/img/avatar/18157191_10158693240550193_146876833177479490_n.jpg', 'Artiste de grand envergure'),
(7, 'Arariss', 'dsqdxc7', 'Arariss@gmail.com', 'Arariss_3', 'localhost:8081/img/avatar/18698349_286289208447628_6171174935325848801_n.jpg', 'Artiste de grand envergure'),
(8, 'Goadfrid', 'dsqdxc7', 'Goadfrid@gmail.com', 'Goadfrid_75', 'localhost:8081/img/avatar/19105741_1747984218838282_8635148997344850310_n.jpg', 'Artiste de grand envergure'),
(9, 'Losdir', 'dsqdxc7', 'Losdir@gmail.com', 'Losdir_63', 'localhost:8081/img/avatar/19225892_10155436352837840_1254540457562038641_n.jpg', 'Artiste de grand envergure'),
(10, 'Honhae', 'dsqdxc7', 'Honhae@gmail.com', 'Honhae_48', 'localhost:8081/img/avatar/19366266_1894693200780589_8360078089074888263_n.jpg', 'Artiste de grand envergure'),
(11, 'Tegrhî', 'dsqdxc7', 'Tegrhî@gmail.com', 'Tegrhî_97', 'localhost:8081/img/avatar/19732221_452107195173234_396841025370562985_n.jpg', 'Artiste de grand envergure'),
(12, 'Pydien', 'dsqdxc7', 'Pydien@gmail.com', 'Pydien_80', 'localhost:8081/img/avatar/20840904_1890152374334432_3416921083395940340_n.jpg', 'Artiste de grand envergure'),
(13, 'Lhîbar', 'dsqdxc7', 'Lhîbar@gmail.com', 'Lhîbar_11', 'localhost:8081/img/avatar/24312711_1000542300085974_201450037980878655_n.jpg', 'Artiste de grand envergure'),
(14, 'Bartei', 'dsqdxc7', 'Bartei@gmail.com', 'Bartei_2', 'localhost:8081/img/avatar/29789880_446127632487076_6267720144196162384_n.jpg', 'Artiste de grand envergure'),
(15, 'Caethronrag', 'dsqdxc7', 'Caethronrag@gmail.com', 'Caethronrag_76', 'localhost:8081/img/avatar/44611183_579903162442855_2431212529058316288_n.jpg', 'Artiste de grand envergure'),
(16, 'Rhunfron', 'dsqdxc7', 'Rhunfron@gmail.com', 'Rhunfron_81', 'localhost:8081/img/avatar/45467614_2175527415804051_3754367978724917248_n.jpg', 'Artiste de grand envergure'),
(17, 'Dronvon', 'dsqdxc7', 'Dronvon@gmail.com', 'Dronvon_35', 'localhost:8081/img/avatar/52574074_2023630637734072_689954120638922752_n.jpg', 'Artiste de grand envergure'),
(18, 'Toldam', 'dsqdxc7', 'Toldam@gmail.com', 'Toldam_56', 'localhost:8081/img/avatar/avatar.jpg', 'Artiste de grand envergure');

-- --------------------------------------------------------

--
-- Déchargement des données de la table `œuvre`
--

INSERT INTO `œuvre` (`ID`, `Titre`, `Auteur`, `Description`, `Prix de location`, `Localisation`) VALUES
(1, 'Chez bob', 2, 'Il etait une fois chez bob', 56.00, 18),
(2, 'MDR c est le TERTER', 2, 'L histoire du TERTER', 1806.00, 19),
(3, 'Chez TC', 1, 'Il etait une fois chez TC', 5566.00, 20),
(4, 'Entree dans le monde moderne', 1, 'En 2005, mise en vente à la Nouvelle-Orléans, la version Cook est acquise par un consortium de marchands d\'art dont Robert Simon, spécialiste des maîtres anciens, pour 10 000 dollars. Le tableau a été gravement endommagé par des tentatives de restauration précédentes, fortement repeint et reverni, de sorte qu\'il ressemble à une copie. Une barbe et des moustaches ont été ajoutées', 1800.00, 21),
(5, 'Cook ', 1, 'Selon Christie\'s10, le tableau aurait autrefois appartenu à Charles Ier d\'Angleterre. À la demande de sa veuve, née Henriette Marie de France, Wenceslas Hollar en réalise une copie gravée, qui est enregistrée dans la collection royale en 164913. Il est admis que la reine Henriette a apporté l\'œuvre en Angleterre par son mariage. Ensuite, on perd sa trace durant un siècle. Le tableau est vendu aux enchères par le fils du duc de Buckingham et Normanby en 1763, puis, sa trace se perd de nouveau14. ', 5555.00, 22),
(6, 'Redécouverte de la version', 1, 'En 2005, mise en vente à la Nouvelle-Orléans, la version Cook est acquise par un consortium de marchands d\'art dont Robert Simon, spécialiste des maîtres anciens, pour 10 000 dollars. Le tableau a été gravement endommagé par des tentatives de restauration précédentes, fortement repeint et reverni, de sorte qu\'il ressemble à une copie. Une barbe et des moustaches ont été ajoutées, probablement après la Contre-Réforme, pour adapter l\'image du Christ à la physionomie officielle. Il est alors décrit comme « une épave, sombre et lugubre »25. ', 9898.00, 23),
(7, 'Expertise', 2, 'Le site britannique the ArtWatch.org.uk de Michel Daley, démontre photographies à l\'appui qu\'entre 2011 et 2017, de nombreux détails de la peinture ont changé, parmi eux le drapé de l\'épaule droite dont le nombre de plis est passé de 9 à 4 ! et qu\'aucune de ces versions ne correspond à la gravure de Hollar49. ', 9587.00, 24),
(8, 'Interrogations et doutes persistants', 1, 'En août 2018, plusieurs experts, dont Matthew Landrus, du Wolfson College d\'Oxford, font part de leurs doutes et attribuent le tableau à Bernardino Luini et aux suiveurs de Léonard de Vinci2. Matthew Landrus démontre, en superposant les radiographies du Salvator Mundi (1500), de la version Ganay (1512) et du Christ parmi les docteurs (1510), l\'existence de trois dessins poncifs préalables, un pour la tête de Christ, un pour le vêtement, un pour la main droite. Chaque partie se superpose parfaitement51. Il attribue les poncifs à Léonard de Vinci pour la fresque perdue du Salvator Mundi peinte en 1495-1498 et détruite en 1603, dans l\'église Santa Maria delle Grazie à Milan, suivant l\'opinion de Ludwig Heydenreich en 196452', 2500.00, 25),
(9, 'Attribution ', 2, 'Certains, à l\'inverse, considèrent certaines parties comme médiocres', 2689.00, 26),
(10, 'technique', 2, 'L\'analyse technique des pigments est réputée « globalement »59 compatible avec la technique de Vinci60. Selon Dianne Modestini, la restauratrice le support en bois de noyer est en très mauvais état et réagit à tout changement d\'humidité et doit être conservé dans un taux d\'humidité de 45 % minimum6', 1256.00, 27),
(11, 'Iconographie', 2, 'ianne Modestini, affirme que le support comportait deux nœuds de boi', 6965.00, 28),
(12, 'Nafea faa ipoipo', 2, ' francs à la mort de l\'artiste, il a été acheté, en 2015, par le Qatar ermites pour 300 millions de dollars,', 325.00, 29),
(13, 'arco Ottoboni', 2, 'Fils de famille, il fut fait cardinal à la demande de la République de Venise par Innocent X le 19 février 1652, puis reçut l\'évêché de Brescia, en territoire vénitien, où il vécut tranquillement. Il devint cardinal dataire sous Clément IX. Presque octogénaire il fut élu pape mais ne régna que quinze mois pendant lesquels il se passa peu de choses. Louis XIV qui se trouvait alors en difficulté voulut profiter des dispositions conciliantes du nouveau pontife, qu\'il avait contribué à faire élire', 569.00, 30),
(14, 'à la reine', 1, 'Christine de Suède Presque octogénaire il fut élu pape mais ne régna que quinze mois pendant lesquels il se passa peu de choses. Louis XIV qui se trouvait alors en difficulté voulut profiter des dispositions conciliantes du nouveau pontife, qu\'il avait contribué à faire élire, et pour se le rendre favorable lui restitua Avignon qu\'il avait fait occupe', 265.00, 31),
(15, 'Canonisations', 1, 'Il canonisa saint Jean de Capistran (1690) et saint Jean de Dieu (16 octobre 1690). ', 899.00, 32);
