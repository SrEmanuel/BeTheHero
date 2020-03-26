const express = require('express');
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router();

//Login
routes.post('/sessions', SessionController.create);

//ONGs
routes.get('/ongs', OngController.index); //Listagem de ongs
routes.post('/ongs', OngController.create);//Cadastramento de ongs

routes.get('/profile', ProfileController.index);

//Casos
routes.post('/incidents', IncidentController.create); //Criação de casos
routes.get('/incidents', IncidentController.index); //Listagem de casos
routes.delete('/incidents/:id', IncidentController.delete); //Deletagem de casos

module.exports = routes;

