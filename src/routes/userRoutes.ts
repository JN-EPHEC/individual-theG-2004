import express, { type Request, type Response } from "express";
import User from "../model/user.js"; // ton modèle Sequelize
import * as userController from "../controllers/userController.js";

const router = express.Router();

// Différentes routes pour pouvoir utiliser les mothodes 
router.get('/api/users', userController.getAllUsers);
router.post('/api/users', userController.postUsers);
router.delete('/api/users/:id', userController.delUsers)

export { router as userRoutes };