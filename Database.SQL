-- Création de la base de données pour la gestion des séminaristes AEEMCI
CREATE DATABASE IF NOT EXISTS gestionsseminaristes;
USE gestionsseminaristes;

-- Création de la table des membres
CREATE TABLE IF NOT EXISTS aeem_membre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    prenom VARCHAR(255) NOT NULL,
    date_naissance DATE NOT NULL,
    genre ENUM('homme', 'femme') NOT NULL,
    niveau_etude VARCHAR(50) NOT NULL,
    ville VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    urgence VARCHAR(20) NOT NULL,
    date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les recherches
CREATE INDEX idx_nom_prenom ON aeem_membre (nom, prenom);
CREATE INDEX idx_ville ON aeem_membre (ville);
CREATE INDEX idx_genre ON aeem_membre (genre);
