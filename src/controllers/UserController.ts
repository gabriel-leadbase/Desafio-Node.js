import { Request, Response } from 'express';
import { createUser } from '../useCases/createUser';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password, roles } = request.body;

    try {
      const userData = await createUser({
        cpfNumber: cpf,
        password,
        roles,
      });

      return response.status(201).json(userData);
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  }
}
