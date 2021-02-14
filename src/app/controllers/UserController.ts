import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async index(request: Request, response: Response) {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    const list = users.map((user) => ({
      id: user.id,
      name: user.name
    }));

    return response.status(200).json({ list });
  }

  async store(request: Request, response: Response) {
    try {
      const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      }

      const { name, password, cpf } = request.body;

      const userRepository = getRepository(User);

      const userExists = await userRepository.findOne({ where: { cpf } });

      if (userExists) {
        return response.status(400).json({
          error: {
            code: '001',
            message: 'CPF em uso'
          }
        });
      }

      const userData = userRepository.create({
        name,
        cpf,
        password
      });

      await userRepository.save(userData);

      return response.status(200).json({
        message: 'Usuário criado com sucesso'
      });
    } catch (err) {
      /* istanbul ignore next */
      return response.status(400).json({
        error: {
          code: '002',
          message: 'Erro ao cadastrar o usuário',
          err: err.message
        }
      });
    }
  }

  async show(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const userRepository = getRepository(User);

      const user = await userRepository.findOne({
        where: { id },
        relations: ['permissions']
      });

      if (!user) {
        return response.status(400).json({
          error: {
            code: '001',
            message: 'Usuário não encontrado'
          }
        });
      }

      return response.status(200).json({
        id: user?.id,
        name: user?.name,
        cpf: user?.cpf,
        isAdmin: user?.isAdmin,
        createdAt: user?.createdAt.toISOString(),
        permissions: user?.permissions
      });
    } catch (err) {
      return response.status(400).json({
        error: {
          code: '002',
          message: 'Usuário não encontrado'
        }
      });
    }
  }
}

export default new UserController();
