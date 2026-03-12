import express, { type Request, type Response } from "express";
import User from "../model/user.js"; // ton modèle Sequelize

const router = express.Router();

// GET /api/users - récupérer tous les utilisateurs
router.get('/api/users', async (req: Request, res: Response) => { 
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs' });
    }
});

// POST /api/users - créer un nouvel utilisateur
router.post('/api/users', async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body); // req.body contient les données envoyées
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Erreur lors de la création de l’utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
    }
});

// DELETE /api/users/:id - supprimer un utilisateur par ID
router.delete('/api/users/:id', async (req: Request, res: Response) => {
    try {
        const deletedCount = await User.destroy({
            where: { id: req.params.id }
        });

        if (deletedCount === 0) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
        } else {
            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de l’utilisateur :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de l’utilisateur' });
    }
});

export { router as userRoutes };