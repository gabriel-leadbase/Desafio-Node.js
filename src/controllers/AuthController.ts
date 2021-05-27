import {  Request, Response } from "express";
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UsersRepository  from "../repositories/UserRepository";

class AuthController {
  async login(req: Request, res: Response) {
    const repository = getCustomRepository(UsersRepository);

    const { cpf, password } = req.body;

    const user = await repository.findOne({ where: { cpf } });

    if(!user) {
      return res.status(401).send('Unauthorized');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword) {
      return res.status(401).send('cpf or password is wrong!')
    }
    
    const token = jwt.sign({ id: user.id, role: user.role }, 'secret', { expiresIn: '1d'});
    
    return res.json({
      // user,
      token
    })
  }
}

export default AuthController