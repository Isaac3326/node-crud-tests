const request = require('supertest')
const app = require('../app')

let id;

test('GET /actors debe retornar todos los actores', async() => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /actors debe crear un actor', async() =>{
    const body = {
        firstName: "Isaac",
        lastName: "Moya",
        nationality: "Dominicana",
        image: "http://es hermoso",
        birthday:  "2000-01-20"
    };
    const res = await request(app).post('/actors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
    expect(res.body.lastName).toBe(body.lastName);
    expect(res.body.nationality).toBe(body.nationality);
    expect(res.body.image).toBe(body.image);
});

test('PUT /actors debe actualizar un actor', async() =>{
    const body = {
        firstName: "Isaac actualizado"
    }
    const res = await request(app).put(`/actors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name)
});

test('DELETE /actors/:id debe eliminar un actor', async () => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204);
});
