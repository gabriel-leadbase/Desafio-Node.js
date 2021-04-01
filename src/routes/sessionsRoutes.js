import { Router } from 'express';
import CreateSessionService from '../services/session/CreateSessionService';
import validateUser from '../validators/UserStore';
import AppError from '../errors/AppError';

const sessionsRouter = Router();

sessionsRouter.post('/', validateUser, async (request, response) => {
  const { cpf, senha } = request.body;

  const createSessionService = new CreateSessionService();

  const result = await createSessionService.execute({
    cpf,
    senha,
  });
  if (result instanceof AppError) {
    return response.status(result.statusCode).json(result.message);
  }
  return response.status(201).json({ user: result.user, token: result.token });
});

export default sessionsRouter;
