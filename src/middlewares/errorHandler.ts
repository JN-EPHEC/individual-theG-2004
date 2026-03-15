import { type Request, type Response, type NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    
    // On récupère le statut et le message
    const status = err.status || 500;
    const message = err.message || "Une erreur interne est survenue sur le serveur.";

    // On enrichit le log console avec les infos de l'image (URL, Methode, IP)
    console.error(
        `[ERROR] ${status} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );

    // Si tu veux voir la pile d'erreur complète (stack trace) uniquement en console :
    if (status === 500) {
        console.error(err.stack);
    }

    // Réponse au client
    res.status(status).json({
        error: message,
        status: status
    });
};