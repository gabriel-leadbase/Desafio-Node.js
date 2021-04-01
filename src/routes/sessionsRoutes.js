import { Router } from 'express';
import CreateSessionService from '../services/session/CreateSessionService';
import validateUser from '../validators/UserStore';

const sessionsRouter = Router();

sessionsRouter.post('/', validateUser, async (request, response) => {
  const { cpf, senha } = request.body;

  const createSessionService = new CreateSessionService();

  const { user, token } = await createSessionService.execute({
    cpf,
    senha,
  });

  return response.status(201).json({ user, token });
});

export default sessionsRouter;
