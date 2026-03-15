import type { Request, Response, NextFunction } from 'express';


// Logs en temps réel des appels de mon serveur vers les API, etc.
export const requestLogger = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    next(); // Indispensable pour passer à la suite !

};