import { exception } from 'console';
import { Request, Response} from 'express'
import { getRepository } from 'typeorm'
import user from '../../models/user'

class userController {
    async store(req: Request, res: Response)
    {
        const repository = getRepository(user);
        const {cpf, password, role} = req.body;

        const userExists = await repository.findOne({
            where: {
                cpf: cpf
            }
        })

        if(userExists)
        {
            return res.sendStatus(409);
        }

        const newUser = repository.create({cpf, password, role});

        await repository.save(newUser);

        return res.json(newUser);
        
    }
}

export default new userController();