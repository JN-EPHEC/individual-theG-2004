import express, { type Request, type Response } from "express";
import User from "../model/user.js"; // ton modèle Sequelize
import * as userController from "../controllers/userController.js";


const router = express.Router();


// Différentes routes pour pouvoir utiliser les méthodes


/**
 * @swagger
 *   /api/users:
 *      get:
 *       summary: Récupère la liste des utilisateurs pour les injecter dans un tableau
 *       tags: [Users]
 *       responses:
 *         200:
 *           description: Succès
 *         500:
 *           description: Erreur dans le Get
 */
router.get('/api/users', userController.getAllUsers);


/**
 * @swagger
 *    /api/users:
 *      post:
 *          summary: Crée un nouvel utilisateur dans la db
 *          tags: [Users]
 *          requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                       schema:
 *                           type: object
 *                           properties:
 *                               prenom:
 *                                   type: string
 *                               nom:
 *                                   type: string
 *          responses:
 *              201:
 *                   description: Utilisateur créé
 *              400:
 *                   description: Champ manquant          
 */
router.post('/api/users', userController.postUsers);


/**
 *  @swagger
 *     /api/users/{id}:
 *           delete:
 *                   summary: Supprimer un utilisateur par son ID
 *                   tags: [Users]
 *                   parameters:
 *                       - in: path
 *                         name: id
 *                         schema:
 *                           type: integer
 *                           required: true
 *                           description: L'ID numérique de l'utilisateur à supprimer
 *                   responses:
 *                       200:
 *                           description: Utilisateur supprimé avec succès
 *                       404:
 *                           description: Utilisateur non trouvé
 *                       500:
 *                           description: Erreur serveur
 */
router.delete('/api/users/:id', userController.delUsers);


export { router as userRoutes };