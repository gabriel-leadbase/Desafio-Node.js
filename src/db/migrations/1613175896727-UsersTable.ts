import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class UsersTable1613175896727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp" ');

        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns:[
                    {
                       name: 'id',
                       type: 'uuid',
                       isPrimary: true,
                       generationStrategy: 'uuid',
                       default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type:'varchar'
                    },
                    {
                        name: 'role',
                        type: 'varchar'
                    }
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.query('DROP EXTENSION "uuid_ossp"');
    }

}
