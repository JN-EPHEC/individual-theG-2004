// Source - https://stackoverflow.com/q/55029813
// Posted by Shaun Luttin
// Retrieved 2026-02-10, License - CC BY-SA 4.0
import express, { type Request, type Response } from "express";
import { Sequelize } from "sequelize";
import User from "../model/user.js";

const router = express.Router();


const sequelize = new Sequelize('database','username', 'password', {
    host : 'localhost',
    dialect : 'postgres' // ou 'mysql', 'sqlite', 'mariadb', 'mssql'
});

    router.get('/api/users', async (req : Request, res : Response) => { 
            try {
                const users = await User.findAll(); // User est un modèle Sequelize représentant la table des utilisateurs dans la base de données
                res.json(users); // on renvoie les utilisateurs au format JSON
            } catch (error){
                console.error('Erreur lors de la récupération des utilisateurs :', error);
                res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs' });
            }
    });


export { router as userRoutes };