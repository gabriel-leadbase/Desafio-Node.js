import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_permission').del();
  // Inserts seed entries
  await knex('user_permission').insert([
    {
      id: '934a005a-3368-427a-9fef-1e4e2e0f9b5c',
      user_id: '25c45c27-1260-4ea7-89ab-ca57873dd6d2',
      permission_id: '45b90cbd-b4f6-411a-add5-82ecef8ee8c4'
    },
    {
      id: '182b0095-4994-4bf6-bae7-42f1701bafdb',
      user_id: '25c45c27-1260-4ea7-89ab-ca57873dd6d2',
      permission_id: 'cb7fd944-076b-4257-87ce-42c39ddaf0a1'
    },
    {
      id: 'f34dc9bc-c322-4e9d-8f46-a1a599397f06',
      user_id: '25c45c27-1260-4ea7-89ab-ca57873dd6d2',
      permission_id: '230b5b65-9568-4563-a667-a0fb44e3caff'
    },
    {
      id: '9953015d-5662-4bb6-b5ee-8a0c5c6390c6',
      user_id: '25c45c27-1260-4ea7-89ab-ca57873dd6d2',
      permission_id: '12cab234-4665-463a-bff3-2d8c2a40d2a0'
    },
    {
      id: 'bb79e490-fc1b-49c1-9982-995ab1ce71e3',
      user_id: 'ae2598a1-51c9-44f1-ab1d-f764ebf3c16c',
      permission_id: '45b90cbd-b4f6-411a-add5-82ecef8ee8c4'
    }
  ]);
}
