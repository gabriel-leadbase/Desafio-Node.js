import { Request, Response, NextFunction } from 'express';
import { secretKey } from './../../../config';
import { tokenPayload } from './../interfaces/iPayload'
import jwt from 'jsonwebtoken';

export default function authMiddleware(req: Request, res: Response, next: NextFunction){
    const { authorization } = req.headers;

    if(!authorization)
    {
        return res.sendStatus(401);
    }
;
    const token = authorization.replace('Bearer', '').trim();

    try{
        const payload = jwt.verify(token, secretKey)
        
        const { id } = payload as tokenPayload

        req.userId =  id;

        return next();
    }catch
    {
        return res.sendStatus(401);
    }
}