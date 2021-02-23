import { body } from 'express-validator';

export const store = [
  body('name').notEmpty().withMessage('O campo name é obrigatório')
];

export const destroy = [
  body('name').notEmpty().withMessage('O campo name é obrigatório')
];
