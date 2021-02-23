import * as Knex from 'knex';
import Hash from '../../app/services/Hash';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  const hashedPassword = await Hash.generate('123123');

  // Inserts seed entries
  await knex('users').insert([
    {
      id: '25c45c27-1260-4ea7-89ab-ca57873dd6d2',
      name: 'Bento Cauã Campos',
      cpf: '56912833675',
      password: hashedPassword,
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 'ae2598a1-51c9-44f1-ab1d-f764ebf3c16c',
      name: 'Juliana Débora Malu Aragão',
      cpf: '76154589433',
      password: hashedPassword,
      is_admin: false,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}
