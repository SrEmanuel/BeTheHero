const express = require('express');
//Importando o crypto para gerar uma ID aleatória para a ONG.
const crypto = require('crypto');

//Importando a conexão com o banco de dados para realizar operações com ele.
const connection = require('./database/connection');

const routes = express.Router();

routes.get('/ongs', async (request, response) => {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
});


//Cadastramento de uma ONG na database
routes.post('/ongs', async (request, response) =>{
    //Pegando alguns elementos do corpo da resposta.
    const {name, email, whatsapp, city, uf} = request.body;
    //Gerando 4 bytes de caracteres aleatórios convertidos em HEXADECIMAL
    const id = crypto.randomBytes(4).toString('HEX');

    //Conectando com a tablea ONGs, inserido tais dados:
    await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf,
    })

    //Retornando o ID para o cliente.
    return response.json({id});
});

module.exports = routes;