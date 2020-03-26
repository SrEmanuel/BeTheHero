const connection = require('../database/connection');

module.exports = {
    //Rota para verificar se a ONG existe no banco (LOGIN)
    async create(request, response){
        //Pega o ID da ONG do corpo da requisição
        const {id} = request.body;
        
        //Faz uma procura no banco de dados "ongs"
        const ong = await connection('ongs')
            .where('id', id)//Procura na tabela uma ONG com o mesmo ID requisitado
            .select('name')//Seleciona o nome.
            .first()

        //Verifica se a ONG existe.
        if(!ong) {
            return response.status(400).json({ error: 'No ONG found with this ID'});
        }    

        //Responde o nome da ONG logada caso tudo ocorra bem.
        return response.json(ong);
    }
}