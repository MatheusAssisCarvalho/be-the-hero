const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = { 
    async index(request, response) { // Função para listar casos na tela,
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },
    async create(request, response) { // Função para criar uma nova ong
        const {name, email, whatsapp, city, uf} = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

       await connection('ongs').insert({
          id,
          name,
          email,
          whatsapp,
          city,
          uf,
        })
    return response.json({ id });
    }
}