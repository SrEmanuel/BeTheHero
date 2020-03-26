const connection = require('../database/connection');

module.exports = {
    //Rota para listar casos.
    async index(request, response){
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        //Seleciona todos os conteúdos da tabela incidents e armazena na variável 'incidents'
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page-1)*5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);
        //Retorna como resposta o conteúdo da variável 'incidents' em formato JSON.
        return response.json(incidents);
    },

    //Rota para criar casos.
    async create(request, response) {
        //Pega do corpo da requisição os valores de TITLE, DESCRIPTION e VALUE
        const {title, description, value} = request.body;
        //Pega o ID da ONG autenticada que criou o caso.
        const ong_id = request.headers.authorization;

        //Insere na tabela 'incidents', valores nas colunas listadas.
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        //Retorna o ID do caso
        return response.json({id});
    },

    //Rota para deletar casos.
    async delete(request, response){
        //Pega o ID que vem do parâmetro de rota. Ex: incidents/01 (Caso que será deletado)
        const {id} = request.params;
        //Pega o ID da ONG que está logada, pelo headers authorization.
        const ong_id = request.headers.authorization;

        //Puxando do banco de dados informações sobre o caso.
        const incidents = await connection('incidents')
            .where('id', id) //Procura na tabela um caso que tenha o mesmo ID requisitado
            .select('ong_id') //Seleciona o ID da ONG que criou esse caso.
            .first();

        //Verificação de segurança
        //Se uma ONG estiver tentando deletar que não é dela, a operação será negada.
        if (incidents.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted.'})
        }

        //Deleta o caso do banco se foi autorizado.
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();           
    }
};