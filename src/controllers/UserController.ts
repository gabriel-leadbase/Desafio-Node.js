import { Request, Response } from 'express';
import { createUser } from '../useCases/createUser';

export class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    try {
      const tokenAndUserData = await createUser({
        cpfNumber: cpf,
        password,
      });

      return response.status(201).json(tokenAndUserData);
    } catch (error) {
      console.log(error);
      return response.status(500).send();
    }
  }
}
