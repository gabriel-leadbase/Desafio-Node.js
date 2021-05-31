import { Request, Response } from 'express';
import { createUser } from '../useCases/createUser';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    try {
      const user = await createUser({
        cpfNumber: cpf,
        password,
      });

      return response.status(201).json(user);
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  }
}
