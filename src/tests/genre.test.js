const request = require('supertest')
const app = require('../app')

let id;

test('GET /genres debe retornar todos los generos', async() => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /genres debe crear un genero', async() =>{
    const body = {
        name: "Isaac",
    };
    const res = await request(app).post('/genres').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
});

test('PUT /genres debe actualizar un genero', async() =>{
    const body = {
        name: "Isaac actualizado"
    }
    const res = await request(app).put(`/genres/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name)
});

test('DELETE /genres/:id debe eliminar un genero', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});
