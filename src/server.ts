// Source - https://stackoverflow.com/q/55029813
// Posted by Shaun Luttin
// Retrieved 2026-02-10, License - CC BY-SA 4.0

import './model/user.js'; // Importation du modèle User pour s'assurer que la table est créée dans la base de données
import express, { type Request, type Response } from "express";
import { userRoutes } from './routes/userRoutes.js';
import sequelize from './config/database.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from './middlewares/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(requestLogger);
app.use(express.json()); // Middleware pour parser les requêtes JSON
app.use('/', userRoutes); // Utilisation des routes définies dans userRoutes.ts

const port = 3000; // le port 


/* interface Etudiant { // interface pour définir la structure d'un objet étudiant
    id: number;
    nom: string;
    prenom: string;
} */

/* const etudiants : Etudiant[] = [
{ id: 1, nom: "Dupont", prenom: "Jean" },
{ id: 2, nom: "Martin", prenom: "Sophie" },
{ id: 3, nom: "Doe", prenom: "John" },
]; */

// const name = { "message": "Bonjour Yves", "timestamp":"2026-01-29T12:00:19.821Z" } // exemple de données pour tester l'API

/* app.get('/api/data', (req: Request, res: Response) => { // route pour récupérer les données des étudiants c'est la route qui donne les data des API
    res.json(etudiants); // permet de changer les données en format JSON afin que le typeScript puisse les comprendre et les utiliser facilement
}); */

/* app.get('/api/hello/:name', (req: Request, res: Response) => { // route pour dire bonjour à une personne en particulier, le ":name" est un paramètre dynamique qui peut être remplacé par n'importe quel nom
   const nameParam = req.params.name; // on récupère le nom à partir des paramètres de la requête
    res.json({ // on construit une réponse JSON avce un message e bienvenue et un timestamp
        message: `Bonjour ${nameParam}`,
        timestamp: new Date().toISOString()
    });
}); */

/* // Exemple de fonction simple pour tester le fonctionnement de TypeScript
function greet(nom:string): string {
    return `Hello, ${nom}! de BAC 2`;
}
console.log(greet("Gaspard")); */


// Middleware pour servir les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, '../public'))); 

// Route par défaut du serveur (racine  "/")
app.get('/', (req: Request, res: Response) => { 
    res.send("Oups une erreur c'est produite vous avez mal été redirigé"); // réponse envoyée lorsque l'utilisateur accède à la racine du serveur
});

app.use(errorHandler);

// fonction pour tester la connexion à la base de donnée
async function testDatabaseConnection() {
    try {
        // on essaie de se connecter à la base de données
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie.');

        await sequelize.sync({ alter: true });
        console.log('La base de données a été synchronisée avec succès.');

        // callBack dans ma console pour indiquer le status, je devrais faire un try except pour gerer les erreurs inatendues
        app.listen(port, () => { 
            console.log(`Serveur lancé sur http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
    }
};

testDatabaseConnection(); // on appelle la fonction pour tester la connexion à la base de données

app.use(userRoutes);

