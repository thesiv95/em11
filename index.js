import assert from 'assert';
import express from 'express';
import config from './env.config.js';
import routes from './src/routes.js';
import sequelize from './db.config.js';

for (const item of Object.values(config)) {
    assert(item, 'Check your env configuration!');
}

const { EXPRESS_PORT } = config;

const app = express();

app.use(express.json());

app.use('/', routes);

sequelize.sync().then(() => console.log('DB tables refreshed or initialized'));

app.listen(EXPRESS_PORT, () => console.log(`App started on port ${EXPRESS_PORT}`));
