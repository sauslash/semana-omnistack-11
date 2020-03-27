const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incident', () => {

    //executa as migrations antes de realizar os testes
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy();
    });

    it('should be able to create a new Incident', async () => {
        const response = await request(app)
        .post('/incidents')
        .set('Authorization', '6607057d')
        .send({
            title: "Doação de alimentos 15",
            description: "Nos ajude doando alimentos",
            value: "50"	
        });

        expect(response.body).toHaveProperty('id');
    })
})