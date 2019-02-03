-- Généré par Oracle SQL Developer Data Modeler 18.3.0.268.1156
--   à :        2019-02-03 17:00:39 CET
--   site :      Oracle Database 11g
--   type :      Oracle Database 11g



CREATE TABLE adress (
    id                          NUMBER,
    userid                      NUMBER,
    pays                        VARCHAR2(32 CHAR) DEFAULT '2',
    code_postal                 VARCHAR2(10 CHAR) DEFAULT '10',
    rue                         CLOB,
    numero                      VARCHAR2(10 CHAR),
    indication_complementaire   CLOB,
    oeuvre_evr_id               NUMBER NOT NULL,
    commande_cmd_id             NUMBER NOT NULL,
    commande_id                 NUMBER NOT NULL
);

CREATE UNIQUE INDEX adress__idx ON
    adress (
        oeuvre_evr_id
    ASC );

CREATE UNIQUE INDEX adress__idxv1 ON
    adress (
        commande_cmd_id
    ASC );

CREATE UNIQUE INDEX adress__idxv2 ON
    adress (
        commande_id
    ASC );

CREATE TABLE artiste (
    userid    NUMBER,
    pseudo    VARCHAR2(37 CHAR),
    id        NUMBER,
    arts_id   NUMBER NOT NULL
);

ALTER TABLE artiste ADD CONSTRAINT arts_pk PRIMARY KEY ( arts_id );

CREATE TABLE commande (
    id                  NUMBER,
    idvendeur           NUMBER,
    idacheteur          NUMBER,
    idoeuvre            NUMBER,
    etat                INTEGER,
    "date"              TIMESTAMP,
    duree               TIMESTAMP,
    localisation        NUMBER,
    masquage            CHAR(1),
    debut_de_location   TIMESTAMP,
    cmd_id              NUMBER NOT NULL,
    oeuvre_evr_id       NUMBER NOT NULL
);

ALTER TABLE commande ADD CONSTRAINT cmd_pk PRIMARY KEY ( cmd_id );

ALTER TABLE commande ADD CONSTRAINT commande_id_un UNIQUE ( id );

CREATE TABLE oeuvre (
    id                    NUMBER,
    titre_de_l_oeuvre     VARCHAR2(128 CHAR),
    createur              NUMBER,
    prix_de_location      FLOAT,
    proprietaire_actuel   NUMBER,
    localisation          NUMBER,
    dimx                  INTEGER,
    dimy                  INTEGER,
    evr_id                NUMBER NOT NULL,
    user_usrd_id          NUMBER NOT NULL,
    artiste_arts_id       NUMBER
);

CREATE UNIQUE INDEX oeuvre__idx ON
    oeuvre (
        user_usrd_id
    ASC );

ALTER TABLE oeuvre ADD CONSTRAINT evr_pk PRIMARY KEY ( evr_id );

CREATE TABLE relation_11 (
    user_usrd_id      NUMBER NOT NULL,
    commande_cmd_id   NUMBER NOT NULL
);

ALTER TABLE relation_11 ADD CONSTRAINT relation_11_pk PRIMARY KEY ( user_usrd_id,
                                                                    commande_cmd_id );

CREATE TABLE tag (
    id              NUMBER,
    tagname         VARCHAR2(31 CHAR),
    oeuvreid        NUMBER,
    oeuvre_evr_id   NUMBER NOT NULL
);

CREATE TABLE tag_couleur (
    id              NUMBER,
    couleur         VARCHAR2(6 CHAR),
    oeuvreid        NUMBER,
    oeuvre_evr_id   NUMBER NOT NULL
);

CREATE TABLE "user" (
    id                NUMBER,
    username          VARCHAR2(40) DEFAULT '40',
    mot_de_passe      VARCHAR2(32 CHAR) DEFAULT '32',
    email             VARCHAR2(64 CHAR) DEFAULT '64',
    instagram         VARCHAR2(32 CHAR),
    avatar            VARCHAR2(128 CHAR),
    description       CLOB,
    usrd_id           NUMBER NOT NULL,
    artiste_arts_id   NUMBER NOT NULL
);

CREATE UNIQUE INDEX user__idx ON
    "user" (
        artiste_arts_id
    ASC );

ALTER TABLE "user" ADD CONSTRAINT usrd_pk PRIMARY KEY ( usrd_id );

ALTER TABLE adress
    ADD CONSTRAINT adress_commande_fk FOREIGN KEY ( commande_id )
        REFERENCES commande ( cmd_id );

ALTER TABLE adress
    ADD CONSTRAINT adress_oeuvre_fk FOREIGN KEY ( oeuvre_evr_id )
        REFERENCES oeuvre ( evr_id );

ALTER TABLE commande
    ADD CONSTRAINT commande_oeuvre_fk FOREIGN KEY ( oeuvre_evr_id )
        REFERENCES oeuvre ( evr_id );

ALTER TABLE oeuvre
    ADD CONSTRAINT oeuvre_artiste_fk FOREIGN KEY ( artiste_arts_id )
        REFERENCES artiste ( arts_id );

ALTER TABLE oeuvre
    ADD CONSTRAINT oeuvre_user_fk FOREIGN KEY ( user_usrd_id )
        REFERENCES "user" ( usrd_id );

ALTER TABLE relation_11
    ADD CONSTRAINT relation_11_commande_fk FOREIGN KEY ( commande_cmd_id )
        REFERENCES commande ( cmd_id );

ALTER TABLE relation_11
    ADD CONSTRAINT relation_11_user_fk FOREIGN KEY ( user_usrd_id )
        REFERENCES "user" ( usrd_id );

ALTER TABLE tag_couleur
    ADD CONSTRAINT tag_couleur_oeuvre_fk FOREIGN KEY ( oeuvre_evr_id )
        REFERENCES oeuvre ( evr_id );

ALTER TABLE tag
    ADD CONSTRAINT tag_oeuvre_fk FOREIGN KEY ( oeuvre_evr_id )
        REFERENCES oeuvre ( evr_id );

ALTER TABLE "user"
    ADD CONSTRAINT user_artiste_fk FOREIGN KEY ( artiste_arts_id )
        REFERENCES artiste ( arts_id );

ALTER TABLE adress
    ADD CONSTRAINT adress_commande_fk FOREIGN KEY ( commande_id )
        REFERENCES commande ( cmd_id );

ALTER TABLE adress
    ADD CONSTRAINT adress_oeuvre_fk FOREIGN KEY ( oeuvre_evr_id )
        REFERENCES oeuvre ( evr_id );

ALTER TABLE commande
    ADD CONSTRAINT commande_oeuvre_fk FOREIGN KEY ( oeuvre_evr_id )
        REFERENCES oeuvre ( evr_id );

ALTER TABLE oeuvre
    ADD CONSTRAINT oeuvre_artiste_fk FOREIGN KEY ( artiste_arts_id )
        REFERENCES artiste ( arts_id );

ALTER TABLE oeuvre
    ADD CONSTRAINT oeuvre_user_fk FOREIGN KEY ( user_usrd_id )
        REFERENCES "user" ( usrd_id );

ALTER TABLE relation_11
    ADD CONSTRAINT relation_11_commande_fk FOREIGN KEY ( commande_cmd_id )
        REFERENCES commande ( cmd_id );

ALTER TABLE relation_11
    ADD CONSTRAINT relation_11_user_fk FOREIGN KEY ( user_usrd_id )
        REFERENCES "user" ( usrd_id );

ALTER TABLE tag_couleur
    ADD CONSTRAINT tag_couleur_oeuvre_fk FOREIGN KEY ( oeuvre_evr_id )
        REFERENCES oeuvre ( evr_id );

ALTER TABLE tag
    ADD CONSTRAINT tag_oeuvre_fk FOREIGN KEY ( oeuvre_evr_id )
        REFERENCES oeuvre ( evr_id );

ALTER TABLE "user"
    ADD CONSTRAINT user_artiste_fk FOREIGN KEY ( artiste_arts_id )
        REFERENCES artiste ( arts_id );

CREATE SEQUENCE arts_arts_id_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER arts_arts_id_trg BEFORE
    INSERT ON artiste
    FOR EACH ROW
    WHEN ( new.arts_id IS NULL )
BEGIN
    :new.arts_id := arts_arts_id_seq.nextval;
END;
/

CREATE SEQUENCE cmd_cmd_id_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER cmd_cmd_id_trg BEFORE
    INSERT ON commande
    FOR EACH ROW
    WHEN ( new.cmd_id IS NULL )
BEGIN
    :new.cmd_id := cmd_cmd_id_seq.nextval;
END;
/

CREATE SEQUENCE evr_evr_id_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER evr_evr_id_trg BEFORE
    INSERT ON oeuvre
    FOR EACH ROW
    WHEN ( new.evr_id IS NULL )
BEGIN
    :new.evr_id := evr_evr_id_seq.nextval;
END;
/

CREATE SEQUENCE usrd_usrd_id_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER usrd_usrd_id_trg BEFORE
    INSERT ON "user"
    FOR EACH ROW
    WHEN ( new.usrd_id IS NULL )
BEGIN
    :new.usrd_id := usrd_usrd_id_seq.nextval;
END;
/



-- Rapport récapitulatif d'Oracle SQL Developer Data Modeler : 
-- 
-- CREATE TABLE                             8
-- CREATE INDEX                             5
-- ALTER TABLE                             26
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           4
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          4
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
