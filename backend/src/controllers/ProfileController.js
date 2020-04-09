const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        
        const ong_id = request.headers.authorization;
        
        const { page = 1 } = request.query;
        const [count] = await connection('incidents').where('ong_id', ong_id).count();
        
        const incidents = await connection('incidents')
        .where('ong_id', ong_id)
        .limit(4)
        .offset((page - 1) * 4)
        .select('*');

        response.header('Access-Control-Expose-Headers', 'X-Total-Count')
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    }
}