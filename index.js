import react from 'react';
import { Express } from 'express';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const joueurs = [
  { id: 1, idEquipe: 1, nom: "Joueur1", numero: 10, poste: "Attaquant" },
  { id: 2, idEquipe: 2, nom: "Joueur2", numero: 7, poste: "Milieu" },
 
];



// Create (POST)
app.post('/api/joueurs', (req, res) => {
  const newJoueur = req.body;

  res.json(newJoueur);
});

// Read (GET - All)
app.get('/api/joueurs', (req, res) => {
  res.json(joueurs);
});

// Read (GET - Par ID)
app.get('/api/joueurs/:id', (req, res) => {
  const joueurId = parseInt(req.params.id);
  const joueur = joueurs.find(joueur => joueur.id === joueurId);
  res.json(joueur);
});

// Update (PUT)
app.put('/api/joueurs/:id', (req, res) => {
  const joueurId = parseInt(req.params.id);
  const updatedJoueur = req.body;
  res.json(updatedJoueur);
});

// Delete (DELETE)
app.delete('/api/joueurs/:id', (req, res) => {
  const joueurId = parseInt(req.params.id);
  res.json({ message: 'Joueur supprimé avec succès' });
});

// Afficher les joueurs d'une équipe via son ID
app.get('/api/equipes/:idEquipe/joueurs', (req, res) => {
  const equipeId = parseInt(req.params.idEquipe);
  const equipeJoueurs = joueurs.filter(joueur => joueur.idEquipe === equipeId);
  res.json(equipeJoueurs);
});

// Afficher l'équipe d'un joueur donné via son ID
app.get('/api/joueurs/:id/equipe', (req, res) => {
  const joueurId = parseInt(req.params.id);
  const joueur = joueurs.find(joueur => joueur.id === joueurId);
  const equipeId = joueur ? joueur.idEquipe : null;
  res.json({ equipeId });
});

// Chercher un joueur à partir de son nom
app.get('/api/joueurs', (req, res) => {
  const nomJoueur = req.query.nom;
  const joueurRecherche = joueurs.find(joueur => joueur.nom === nomJoueur);
  res.json(joueurRecherche);
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
