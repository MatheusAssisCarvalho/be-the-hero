const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); // Conexão com o banco de dados

module.exports = connection;