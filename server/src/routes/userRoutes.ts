import express, { type Request, type Response } from "express";
import User from "../model/user.js";
import * as userController from "../controllers/userController.js";
import { checkIdParam } from "../middlewares/checkIdParam.js";

const router = express.Router();


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste de tous les utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 *       500:
 *         description: Erreur serveur
 */
router.get('/api/users', userController.getAllUsers);


/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prenom
 *               - nom
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: Jean
 *               nom:
 *                 type: string
 *                 example: Dupont
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Champ manquant ou invalide
 *       500:
 *         description: Erreur serveur
 */
router.post('/api/users', userController.postUsers);


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID numérique de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé avec succès
 *       400:
 *         description: ID invalide (doit être un entier positif)
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/api/users/:id', checkIdParam, userController.getUserById);


/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Met à jour un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID numérique de l'utilisateur à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prenom:
 *                 type: string
 *                 example: Jean
 *               nom:
 *                 type: string
 *                 example: Dupont
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: ID invalide (doit être un entier positif)
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/api/users/:id', checkIdParam, userController.updateUser);


/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: L'ID numérique de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       400:
 *         description: ID invalide (doit être un entier positif)
 *       404:
 *         description: Utilisateur non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/api/users/:id', checkIdParam, userController.delUsers);


export { router as userRoutes };    