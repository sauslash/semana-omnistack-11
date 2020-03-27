const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {

    //executa as migrations antes de realizar os testes
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    //finaliza a conexão depois que os testes são finalizados
    afterAll( async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        .send({
            name: "APAD",
            email: "apd@email.com",
            whatsapp: "11111111111",
            city: "Santos",
            uf: "SP"
        });

        console.log(response.body);

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})