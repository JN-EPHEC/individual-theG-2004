// Source - https://stackoverflow.com/q/55029813
// Posted by Shaun Luttin
// Retrieved 2026-02-10, License - CC BY-SA 4.0
import express, { type Request, type Response } from "express";

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


app.get('/', (req: Request, res: Response) => { // Route par défaut du serveur (racine  "/")
    res.send('Bienvenue sur mon serveur API');
});

app.get('/api/data', (req: Request, res: Response) => { // route pour récupérer les données des étudiants c'est la route qui donne les data des API
    res.json(etudiants); // permet de changer les données en format JSON afin que le typeScript puisse les comprendre et les utiliser facilement
});

app.listen(port, () => { // callBack dans ma console pour indiquer le status, je devrais faire un try except pour gerer les erreurs inatendues
    console.log('Bienvenue sur mon serveur API')
    console.log(`Serveur lancé !! :  http://localhost:${port}`);
});

// Exemple de fonction simple pour tester le fonctionnement de TypeScript
function greet(name:string): string {
    return `Hello, ${name}! de BAC 2`;
}
console.log(greet("Gaspard"));