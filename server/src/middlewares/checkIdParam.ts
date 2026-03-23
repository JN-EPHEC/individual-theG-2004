import type { Request, Response, NextFunction } from "express";

export const checkIdParam = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id as string;

    if (!id) {
        res.status(400).json({ error: "Bad Request : aucun ID fourni." });
        return;
    }

    const parsed = parseInt(id, 10);

    if (isNaN(parsed) || parsed <= 0 || String(parsed) !== id) {
        res.status(400).json({ error: "Bad Request : l'ID doit être un nombre entier valide." });
        return;
    }

    next();
};