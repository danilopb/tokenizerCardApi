import { Request, Response, NextFunction } from 'express';

export default class AuthMiddleware
{
    handle(req: Request, res: Response, next: NextFunction): any
    {
        const authToken = req.headers.authorization;
        const apiToken = process.env.API_TOKEN ?? '';

        if (!apiToken || authToken !== apiToken) {
            return res.status(401).json({ message: 'No tiene autorizacion.' });
        }

        next();
    }
}