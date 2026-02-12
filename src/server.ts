// Source - https://stackoverflow.com/q/55029813
// Posted by Shaun Luttin
// Retrieved 2026-02-10, License - CC BY-SA 4.0
import express, { type Request, type Response } from "express";
import { userRoutes } from './routes/userRoutes.js';
import sequelize from './config/database.js';

const app = express();
const port = 3000; // le port 

interface Etudiant { // interface pour définir la structure d'un objet étudiant
    id: number;
    nom: string;
    prenom: string;
}

const etudiants : Etudiant[] = [
{ id: 1, nom: "Dupont", prenom: "Jean" },
{ id: 2, nom: "Martin", prenom: "Sophie" },
{ id: 3, nom: "Doe", prenom: "John" },
];

const name = { "message": "Bonjour Yves", "timestamp":"2026-01-29T12:00:19.821Z" } // exemple de données pour tester l'API


app.get('/', (req: Request, res: Response) => { // Route par défaut du serveur (racine  "/")
    res.send('Bienvenue sur mon serveur API');
});

app.get('/api/data', (req: Request, res: Response) => { // route pour récupérer les données des étudiants c'est la route qui donne les data des API
    res.json(etudiants); // permet de changer les données en format JSON afin que le typeScript puisse les comprendre et les utiliser facilement
});

app.get('/api/hello/:name', (req: Request, res: Response) => { // route pour dire bonjour à une personne en particulier, le ":name" est un paramètre dynamique qui peut être remplacé par n'importe quel nom
   const nameParam = req.params.name; // on récupère le nom à partir des paramètres de la requête
    res.json({ // on construit une réponse JSON avce un message e bienvenue et un timestamp
        message: `Bonjour ${nameParam}`,
        timestamp: new Date().toISOString()
    });
});


async function testDatabaseConnection() { // fonction pour tester la connexion à la base de données
    try {
        await sequelize.authenticate(); // on essaie de se connecter à la base de données
        console.log('Connexion à     la base de données réussie.');

        app.listen(port, () => { // callBack dans ma console pour indiquer le status, je devrais faire un try except pour gerer les erreurs inatendues
            console.log(`Serveur lancé !! :  http://localhost:${port}`);
        });
    } catch (error) {
        console.error('Impossible de se connecter à la base de données :', error);
    }
}

testDatabaseConnection(); // on appelle la fonction pour tester la connexion à la base de données

app.use(userRoutes);

/* // Exemple de fonction simple pour tester le fonctionnement de TypeScript
function greet(nom:string): string {
    return `Hello, ${nom}! de BAC 2`;
}
console.log(greet("Gaspard")); */
