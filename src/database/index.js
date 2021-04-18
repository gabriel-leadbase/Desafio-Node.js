import Sequelize from 'sequelize';

import User from '../models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => {
      model.init(this.connection);
      model.associate && model.associate(this.connection.models);
    });
  }
}

export default new Database();
