CREATE DATABASE Musicboxd;

CREATE TABLE userbox (
    identifiant VARCHAR(20) NOT NULL UNIQUE,
    pseudo VARCHAR(30) NOT NULL,
    bio VARCHAR(150),
    pronoms VARCHAR(255),
    localisation VARCHAR(255),
    mail VARCHAR(255) NOT NULL UNIQUE,
    photo VARCHAR(500) NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    is_admin boolean,
    PRIMARY KEY(identifiant)
);

CREATE TABLE abonne (
    id_user VARCHAR(20),
    id_artist VARCHAR(255),
    nom_artiste VARCHAR(255),
    photo_artiste VARCHAR(500),
    FOREIGN KEY(id_user) REFERENCES userbox(identifiant) ON DELETE CASCADE
);

CREATE TABLE listenlist (
    id_user VARCHAR(20),
    id_album VARCHAR(255),
    nom_album VARCHAR(255),
    photo VARCHAR(500), -- lien photo album
    FOREIGN KEY(id_user) REFERENCES userbox(identifiant) ON DELETE CASCADE
);

CREATE TABLE activite (
    id_user VARCHAR(20),
    activite_date timestamp,
    contenu VARCHAR(255),
    FOREIGN KEY(id_user) REFERENCES userbox(identifiant) ON DELETE CASCADE
);

CREATE TABLE review (
    id_user VARCHAR(20),
    id_album VARCHAR(255),
    nom_album VARCHAR(255),
    photo VARCHAR(500), -- lien photo album
    review_date timestamp,
    note numeric,
    texte VARCHAR(255),
    
    FOREIGN KEY(id_user) REFERENCES userbox(identifiant) ON DELETE CASCADE
);
