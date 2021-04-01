import { Router } from 'express';
import AlterRoleUser from '../services/user/AlterRoleUser';
import AppError from '../errors/AppError';

const alterRoleRouter = Router();

alterRoleRouter.put('/', async (request, response) => {
  const { cpf } = request.body;
  const alterRole = new AlterRoleUser();

  const result = await alterRole.execute({ cpf });
  if (result instanceof AppError) {
    return response.status(result.statusCode).json(result.message);
  }
  return response.status(201).json(result);
});

export default alterRoleRouter;
