import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('permissions', (table) => {
      table.uuid('id').primary();
      table.string('name');
    })
    .then(() => {
      const data = [
        {
          id: '45b90cbd-b4f6-411a-add5-82ecef8ee8c4',
          name: 'VISUALIZAR'
        },
        {
          id: 'cb7fd944-076b-4257-87ce-42c39ddaf0a1',
          name: 'EDITAR'
        },
        {
          id: '230b5b65-9568-4563-a667-a0fb44e3caff',
          name: 'CRIAR'
        },
        {
          id: '12cab234-4665-463a-bff3-2d8c2a40d2a0',
          name: 'EXCLUIR'
        }
      ];

      return knex.insert(data).into('permissions');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('permissions');
}
