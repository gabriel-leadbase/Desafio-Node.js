import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import { DatabaseError } from '../app/exceptions/DatabaseError';
import options from '../config/database';

export default class Database {
  private options!: ConnectionOptions;
  private static instance: Database;
  public connection!: Connection;

  private constructor() {}

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
      this.instance.options = options;
    }
    return this.instance;
  }

  async connect() {
    try {
      this.connection = await createConnection(this.options);
    } catch (err) {
      throw new DatabaseError(
        `An occurred error on connect to database: ${err.message}`
      );
    }
  }

  async disconnect() {
    try {
      await this.connection.close();
    } catch (err) {
      console.log(
        `An occurred error on disconnect to database: ${err.message}`
      );
    }
  }

  async clear() {
    const entities = this.connection.entityMetadatas;

    await Promise.all(
      entities.map(async (entity) => {
        const repository = this.connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      })
    );
  }
}
