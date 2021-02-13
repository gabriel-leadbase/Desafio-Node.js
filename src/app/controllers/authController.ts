import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secretKey } from './../../../config'

import user from './../models/user'

class authController {

    async authenticate(req: Request, res: Response){
        const repository = getRepository(user);
        const {cpf, password, role} = req.body;

        const userFind = await repository.findOne({
            where: {
                cpf: cpf
            }
        })

        if(!userFind)
        {
            return res.sendStatus(401)
        } 


        const passValidate = await bcrypt.compare(password, userFind.password)

        if(!passValidate)
        {
            return res.sendStatus(401)
        }

        const token = jwt.sign({ id: userFind.id}, secretKey,{ expiresIn: '1d'});
        const message = 'Token generate succesfull!';

        return res.json({
            token,
            message
        })

    }
}

export default new authController();