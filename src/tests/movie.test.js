const request = require('supertest')
const app = require('../app');
const Actors = require('../models/Actors');
const Directors = require('../models/Directors');
const Genres = require('../models/Genres');


let id;

test('GET /movies debe retornar todas las peliculas', async() => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array)
});

test('POST /movies debe crear una pelicula', async() =>{
    const body = {
        name: "Isaac",
        image: "fhaskfjsdkafjsadjkf",
        synopsis: "kfsdaudisafusdai",
        releaseYear: 2020
    };
    const res = await request(app).post('/movies').send(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(body.name);
    expect(res.body.image).toBe(body.image);
});

test('PUT /movies debe actualizar un movies', async() =>{
    const body = {
        name: "Isaac actualizado"
    }
    const res = await request(app).put(`/movies/${id}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name)
});


test('POST /movies/:id/actors debe insertar un actor a una pelicula', async () => { 
    const actor = await Actors.create({ 
        firstName: "HULK",
        lastName: "STRONG",
        nationality: "HOLLYWOOD",
        image: "el mas fuerte",
        birthday: "2000-03-03"
});
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].firstName).toBe("HULK");
});



test('POST /movies/:id/directors debe insertar un director a la pelicula', async () => { 
    const director = await Directors.create({ 
        firstName: "Michael",
        lastName: "jack",
        nationality: "ee.uu",
        image: "http://fsdjklfjsdlaf",
        birthday: "200/10/10"
});
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].lastName).toBe("jack");
});


test('POST /movies/:id/genres debe insertar un genero a la pelicula', async () => { 
    const genre = await Genres.create({ 
        name: "romantic"
});
    const res = await request(app).post(`/movies/${id}/genres`) .send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe("romantic");
});



test('DELETE /movies/:id debe eliminar una pelicula', async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});


