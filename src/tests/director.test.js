const request = require('supertest')
const app = require('../app')

let id;

test('GET /director debe retornar todos los directores', async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /directors debe crear un director', async() =>{
    const body = {
        firstName: "Isaac",
        lastName: "Moya",
        nationality: "Dominicana",
        image: "http://es hermoso",
        birthday:  "2000-01-20"
    };
    const res = await request(app).post('/directors').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
    expect(res.body.lastName).toBe(body.lastName);
    expect(res.body.nationality).toBe(body.nationality);
    expect(res.body.image).toBe(body.image);
});

test('PUT /directors debe actualizar un director', async() =>{
    const body = {
        firstName: "Isaac actualizado"
    }
    const res = await request(app).put(`/directors/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name)
});

test('DELETE /directors/:id debe eliminar un directors', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});
