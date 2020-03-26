//Realizando conexão com a database

//Importando knex
const knex = require('knex');
//Importando as configurações do knex file.
const configuration = require('../../knexfile');

//Criando a conexão utilizando as configurações de desenvolvimento
const connection = knex(configuration.development);

//Realizando a exportação da conexão.
module.exports = connection;