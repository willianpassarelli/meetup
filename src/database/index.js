import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // inicializa a conexão do postgres com o Sequelize
    this.connection = new Sequelize(databaseConfig);
    // passa a conexão para os models criados
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
