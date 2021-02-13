import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { secretKey } from '../../../../config'

import user from '../../models/user'
import permission from '../../models/permission'

class authController {

    async authenticate(req: Request, res: Response){
        const repository = getRepository(user);
        const permissionRepository =  getRepository(permission);

        const {cpf, password, role} = req.body;

        const userFind = await repository.findOne({
            where: {
                cpf: cpf
            }
        })

        const permissionFind = await permissionRepository.find(
            {
                where:
                {
                    user: userFind
                }
            }
        )

        console.log(permissionFind)

        if(!userFind)
        {
            return res.sendStatus(401)
        } 


        const passValidate = await bcrypt.compare(password, userFind.password)

        if(!passValidate)
        {
            return res.sendStatus(401)
        }

        const token = jwt.sign({ id: userFind.id, cpf: userFind.cpf}, secretKey,{ expiresIn: '1d'});
        const message = 'Token generate succesfull!';
        const payload = {
            id: userFind.id,
            cpf: userFind.cpf,
            permissions: [
                permissionFind
            ]

        }

        return res.json({
            token,
            payload
        })

    }
}

export default new authController();