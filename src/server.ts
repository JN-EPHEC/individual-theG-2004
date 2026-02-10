// Source - https://stackoverflow.com/q/55029813
// Posted by Shaun Luttin
// Retrieved 2026-02-10, License - CC BY-SA 4.0
import express, { type Request, type Response } from "express";

const app = express();
const port = 3000; // le port 

app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenue sur mon serveur API');
});

app.listen(port, () => {
    console.log('Bienvenue sur mon serveur API')
    console.log(`Example app listening at http://localhost:${port}`);
});

function greet(name:string): string {
    return `Hello, ${name}! de BAC 2`;
}
console.log(greet("Gaspard"));