import { body } from 'express-validator';

export const store = [
  body('cpf')
    .notEmpty()
    .withMessage('O campo cpf é obrigatório')
    .isLength({ min: 11, max: 11 })
    .withMessage(
      'O campo cpf deve ter no mínimo 6 caracteres e máximo 6 caractereces'
    ),

  body('password')
    .notEmpty()
    .withMessage('O campo email é obrigatório')
    .isLength({ min: 6, max: 6 })
    .withMessage(
      'O campo password deve ter no mínimo 6 caracteres e máximo 6 caractereces'
    )
];
