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
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import cors from 'cors';

    
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());
app.use(requestLogger);
app.use(express.json()); // Middleware pour parser les requêtes JSON
app.use('/', userRoutes); // Utilisation des routes définies dans userRoutes.ts


const port = 3000; // le port


/* interface Etudiant { // interface pour définir la structure d'un objet étudiant
    id: number;
    nom: string;
    prenom: string;
} */

/* const etudiants: Etudiant[] = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
]; */

/* const name = { "message": "Bonjour Yves", "timestamp":"2026-01-29T12:00:19.821Z" } // exemple de données pour tester l'API */

/* app.get('/api/data', (req: Request, res: Response) => { // route pour récupérer les données des étudiants
    res.json(etudiants); // permet de changer les données en format JSON
}); */

/* app.get('/api/hello/:name', (req: Request, res: Response) => { // route pour dire bonjour à une personne
    const nameParam = req.params.name;
    res.json({ // réponse JSON avec message et timestamp
        message: `Bonjour ${nameParam}`,
        timestamp: new Date().toISOString()
    });
}); */

/* // Exemple de fonction simple pour tester TypeScript
function greet(nom: string): string {
    return `Hello, ${nom}! de BAC 2`;
}
console.log(greet("Gaspard")); */


// Middleware pour servir les fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, '../../public')));

// Route par défaut du serveur (racine "/")
app.get('/', (req: Request, res: Response) => { 
    res.send("Oups une erreur c'est produite vous avez mal été redirigé");
});

app.use(errorHandler);


// Fonction pour tester la connexion à la base de donnée
async function testDatabaseConnection() {

    try {

        // on essaie de se connecter à la base de données
        await sequelize.authenticate();
        console.log('Connexion à la base de données réussie.');

        await sequelize.sync({ alter: true });
        console.log('La base de données a été synchronisée avec succès.');

        // callback pour indiquer le status
        app.listen(port, () => { 
            console.log(`Serveur lancé sur http://localhost:${port}`);
        });

    } catch (error) {

        console.error('Impossible de se connecter à la base de données :', error);

    }

};

testDatabaseConnection(); // on appelle la fonction pour tester la connexion à la base de données

app.use(userRoutes);