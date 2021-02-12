import { Request, Response } from 'express';

class UserController {
  store(request: Request, response: Response) {
    const { name = 'World' } = request.query;

    return response.status(200).json({ message: `Hello ${name}` });
  }
}

export default new UserController();
