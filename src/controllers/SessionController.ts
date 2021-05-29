import { Request, Response } from 'express';
import { authenticate } from '../useCases/authenticate';

export class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const tokenAndUserData = await authenticate({
      cpfNumber: cpf,
      password,
    });

    return response.json(tokenAndUserData);
  }
}
