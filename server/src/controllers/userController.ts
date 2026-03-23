import type { Request, Response, NextFunction } from "express";
import User from "../model/user.js";


// methode : GET
export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        //throw new Error("Test du ErrorHandler : Erreur Catch avec succes!");
        const users = await User.findAll();

        res.json(users);

    } catch (error) {

        next(error);

    }

};


// methode : post
export const postUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const newUser = await User.create(req.body); // req.body contient les données envoyées

        res.status(201).json(newUser);

    } catch (error) {

        next(error);

    }

};


// methode : Delete
export const delUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

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

        next(error);

    }

};


// methode : GET par ID
export const getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const user = await User.findByPk(req.params.id as string); // 👈 as string

        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        res.json(user);

    } catch (error) {
        next(error);
    }
};


// methode : PUT (mise à jour)
export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const user = await User.findByPk(req.params.id as string); // 👈 as string

        if (!user) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        await user.update(req.body);
        res.json(user);

    } catch (error) {
        next(error);
    }
};