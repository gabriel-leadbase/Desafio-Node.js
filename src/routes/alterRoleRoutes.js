import { Router } from 'express';
import AlterRoleUser from '../services/user/AlterRoleUser';

const alterRoleRouter = Router();

alterRoleRouter.put('/', async (request, response) => {
  const { cpf } = request.body;
  const alterRole = new AlterRoleUser();

  const user = await alterRole.execute({ cpf });
  return response.status(201).json(user);
});

export default alterRoleRouter;
