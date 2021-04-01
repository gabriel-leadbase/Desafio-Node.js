import { Router } from 'express';
import CreateUserService from '../services/user/CreateUserService';
import validateUser from '../validators/UserStore';
import AppError from '../errors/AppError';

const usersRouter = Router();

usersRouter.post('/', validateUser, async (request, response) => {
  const { cpf, senha, admin } = request.body;
  const createUser = new CreateUserService();

  const result = await createUser.execute({ cpf, senha, admin });
  if (result instanceof AppError) {
    return response.status(result.statusCode).json(result.message);
  }
  return response.status(201).json(result);
});

export default usersRouter;
