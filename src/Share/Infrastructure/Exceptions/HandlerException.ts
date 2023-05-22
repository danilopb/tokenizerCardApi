import { Request, Response, NextFunction } from 'express';
import CustomException from '../../Domain/Exceptions/CustomException';
import ValidatorException from '../../Domain/Exceptions/ValidatorException';

export default class HandlerException
{
    handle(err: Error, _req: Request, res: Response, next: NextFunction): any
    {
        if (err instanceof  CustomException)
        {
            if (err instanceof ValidatorException) {
                return res.status(err.status).json({ message: err.message, errors: err.errors });
            }

            return res.status(err.status).json({ error: err.message });
        }

        next(err);
    }
}