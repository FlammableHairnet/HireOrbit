const config = require('./config');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: config.dbHost,
    user: config.dbUser,
    database: config.dbName
  }
});

module.exports = knex;