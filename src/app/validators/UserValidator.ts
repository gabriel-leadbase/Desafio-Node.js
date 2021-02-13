import { body } from 'express-validator';

export const store = [
  body('name').notEmpty().withMessage('O campo name é obrigatório'),

  body('cpf').notEmpty().withMessage('O campo cpf é obrigatório'),

  body('password')
    .notEmpty()
    .withMessage('O campo password é obrigatório')
    .isLength({ min: 6, max: 6 })
    .withMessage(
      'O campo password deve ter no mínimo 6 caracteres e máximo 6 caractereces'
    )
];
