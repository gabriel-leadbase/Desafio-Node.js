import { Request, Response} from 'express'
import { getRepository } from 'typeorm'
import permission from '../../models/permission'
import user from '../../models/user'

class permissionController {
    async store(req: Request, res: Response)
    {
        const permissionRepository = getRepository(permission);
        const userRepository = getRepository(user);

        const payload = req.body;


        const verifyUser = await userRepository.findOne(
            {
                where: {
                    id: payload.user.id
                }
            }
        )

        if(!verifyUser)
        {
            return res.sendStatus(403)
        }

        if(verifyUser.role === "admin")
        {
            const newPermission =  permissionRepository.create(payload)

            await permissionRepository.save(newPermission);
    
            return res.json(newPermission); 
        }

        return res.sendStatus(401)
    }

    async update (req: Request, res: Response)
    {
        const permissionRepository = getRepository(permission);
        const userRepository = getRepository(user);

        const payload = req.body;

        const verifyUser = await userRepository.findOne(
            {
                where: {
                    id: payload.user.id
                }
            }
        )

        const verifyPermission = await permissionRepository.find(
            {
                where: {
                    name: payload.name
                }
            }
        )

        if((!verifyUser) || (!verifyPermission))
        {
            return res.sendStatus(403)
        }

        
        if(verifyUser.role === "admin")
        {
           const newPermission = await permissionRepository.update(verifyPermission[0].id, { name: payload.newName, user: payload.user});
    
            return res.json(newPermission); 
        }

        return res.sendStatus(401)

    }


    async delete (req: Request, res: Response)
    {
        const permissionRepository = getRepository(permission);
        const userRepository = getRepository(user);

        const payload = req.body;

        const verifyUser = await userRepository.findOne(
            {
                where: {
                    id: payload.user.id
                }
            }
        )

        const verifyPermission = await permissionRepository.find(
            {
                where: {
                    name: payload.name
                }
            }
        )

        if((!verifyUser) || (!verifyPermission))
        {
            return res.sendStatus(403)
        }

        
        if(verifyUser.role === "admin")
        {
           const deleted = await permissionRepository.delete(verifyPermission[0].id);
    
            return res.json(deleted); 
        }

        return res.sendStatus(401)
    }
}

export default new permissionController();