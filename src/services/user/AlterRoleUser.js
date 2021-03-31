import User from '../../models/User';

class AlterRoleUser {
  async execute({ cpf }) {
    const user = await User.findOne({ where: { cpf } });

    if (!user) {
      console.log('usuario não existe');
    }

    if (user.admin === true) {
      await user.update({ admin: false });
    } else {
      await user.update({ admin: true });
    }
    return user;
  }
}
export default AlterRoleUser;
