const connection = require('../database/connection');

module.exports = {
    //Rota para listar todos os casos de uma ONG
    async index(request, response){
        //Pega o ID da ONG pelo Headers Authorization
        const ong_id = request.headers.authorization;

        //Faz uma procura no banco de dados 'incidents' e armazena o conteúdo selecionado na variável incidents
        const incidents = await connection('incidents')
            .where('ong_id', ong_id) //Procura uma ONG com o mesmo ID requisitado
            .select('*')//Seleciona todos os itens da tablea.
        
        //Responde com a variável incidents
        return response.json(incidents);
    }
}