import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      senha: Yup.string()
        .min(6, 'senha deve ter no minimo 6 digitos')
        .required('Senha é obrigatório'),
      cpf: Yup.string()
        .min(11, 'cpf deve ter no minimo 11 digitos')
        .required('cpf é obrigatório'),
    });
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res.status(400).json({
      error: 'Validacao falhou, corpo da requisicao não esta como o esperado!',
      messages: err.inner,
    });
  }
};
