<?php
// Connexion à la base de données MySQL
$conn = new mysqli("localhost", "root", "", "gestionsseminaristes");

// Vérifie la connexion
if ($conn->connect_error) {
    die("Échec de la connexion : " . $conn->connect_error);
}

// Récupère les données du formulaire
$nom = $_POST['nom'];
$prenom = $_POST['prenom'];
$date_naissance = $_POST['date_naissance'];
$genre = $_POST['genre'];
$niveau_etude = $_POST['niveau_etude'];
$ville = $_POST['ville'];
$telephone = $_POST['telephone'];
$urgence = $_POST['urgence'];

// Requête d'insertion
$sql = "INSERT INTO aeem_membre (nom, prenom, date_naissance, genre, niveau_etude, ville, telephone, urgence)
        VALUES ('$nom', '$prenom', '$date_naissance', '$genre', '$niveau_etude', '$ville', '$telephone', '$urgence')";

if ($conn->query($sql) === TRUE) {
    echo "Membre ajouté avec succès.";
} else {
    echo "Erreur : " . $conn->error;
}

$conn->close();
?>