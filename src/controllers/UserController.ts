import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';

import UsersRepository  from "../repositories/UserRepository";

import { UserRole } from '../DTO/UserDTO';

import AppError from '../errors/Error';

class UserController {
  async signUp(req: Request, res: Response) {
    const repository = getCustomRepository(UsersRepository);

    const { cpf, password, role } = req.body;

    const userExists = await repository.findOne({ where: { cpf } });

    if(userExists) {
      return res.status(409).send('CPF already exists')
    }

    const isApproved = role == "admin" ? true : false;

    const user = repository.create({ cpf, password, role, isApproved });
    await repository.save(user)

    return res.status(201).send('User created successfully! :)');
  };

  list (req: Request, res: Response) {

    return res.status(200).send({ userId: req.userId, userRole: req.userRole });

  };

  async approveSeller (req: Request, res:Response) {
    const repository = getCustomRepository(UsersRepository);

    const { cpf } = req.params;

    const userExists = await repository.findOne({ where: { cpf: cpf } });

    if(!userExists) {
      return res.status(400).send("This user doesn't exist")
    }

    if(!req.userId &&  req.userRole !== UserRole.ADMIN) {
      return res.status(401).send('Unauthorized');
    }

    if(userExists.isApproved === true) {
      return res.status(409).send('CPF already approved')
    }
    
    await repository.update(userExists, { isApproved : true })

    return res.status(200).send({ message: `${userExists.cpf} was approved \ o /` })
  };

  async blockSeller (req: Request, res:Response) {
    const repository = getCustomRepository(UsersRepository);

    const { cpf } = req.params;

    const userExists = await repository.findOne({ where: { cpf: cpf } });

    if(!userExists) {
      return res.status(400).send("This user doesn't exist")
    }

    if(!req.userId &&  req.userRole !== UserRole.ADMIN) {
      return res.status(401).send('Unauthorized');
    }

    if(userExists.isApproved === false) {
      return res.status(409).send('CPF already blocked')
    }
    
    await repository.update(userExists, { isApproved : false})

    return res.status(200).send({ message: `${userExists.cpf} was blocked :(` })
  };
}

export default UserController