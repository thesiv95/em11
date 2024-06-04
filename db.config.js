import { Sequelize } from 'sequelize';
import config from './env.config.js';

const { PG_DB, PG_HOST, PG_LOGIN, PG_PASSWORD, PG_PORT } = config;

const sequelize = new Sequelize(PG_DB, PG_LOGIN, PG_PASSWORD, {
    host: PG_HOST,
    port: PG_PORT,
    dialect: 'postgres',
});

try {
    await sequelize.authenticate();
    await sequelize.sync();
    
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

export default sequelize;