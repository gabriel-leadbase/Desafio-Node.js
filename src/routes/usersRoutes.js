import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { cpf, senha, admin } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({ cpf, senha, admin });
  return response.status(201).json(user);
});

export default usersRouter;
