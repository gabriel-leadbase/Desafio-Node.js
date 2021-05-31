import { Request, Response } from 'express';
import { authenticate } from '../useCases/authenticate';

export class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    try {
      const { user, token } = await authenticate({
        cpfNumber: cpf,
        password,
      });

      return response.json({ user, token });
    } catch (error) {
      console.log(`Error >> ${error}`);
      return response.status(400).json({
        message: 'Unexpected error',
      });
    }
  }
}
