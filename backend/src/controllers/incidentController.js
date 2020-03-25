const connection = require('../database/connection');

module.exports = {
    async index(request, response) { // Função para listar casos na tela, limitado a 5 itens por página
        const {page = 1} = request.query; 

        const [count] = await connection('incidents').count(); // conta quantidade total de itens

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) // esquema de limite de casos por pagina
            .offset((page - 1) * 5) // esquema de limite de casos por pagina
            .select([ // Selecionando dados expecificos que quer retornar
                'incidents.*', // Com o "*" quer que retorne todas as informações
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);

        response.header('X-Total-Counts', count['count(*)']) // conta quantidade total de itens

        return response.json(incidents);
    },
    async create (request, response) { // Função para criar um novo caso
        const { title, description, value} = request.body; // Pegar a informação do body
        const ong_id = request.headers.authorization; // Autenticação do usuário

        const [id] = await connection('incidents').insert({ //Descrição dos itens que tem que entrar de informação
            title,
            description,
            value,
            ong_id,
        })
        return response.json({ id })
    },
    async delete(request, response) { // Função para deletar um caso existente
        const { id } = request.params; // Vai pegar da URL o :id
        const ong_id = request.headers.authorization; // Autenticação do usuário

        const incident = await connection('incidents') // Vai procurar no banco de dados
            .where('id', id) // O ID passado no parametro para exclusão
            .select('ong_id') // Vai selecionar o ID da ong
            .first();
        
        if (incident.ong_id !== ong_id) { // Tem que verificar se o usuário tem essa autorização
            return response.status(401).json({ error: 'Operation not permitted.'});
        }
        await connection ('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}