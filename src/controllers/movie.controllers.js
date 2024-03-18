const catchError = require('../utils/catchError');
const Movies = require('../models/Movies');
const Genres = require('../models/Genres')
const Actors = require('../models/Actors')
const Directors = require('../models/Directors')

const getAll = catchError(async(req, res) => {
    const results = await Movies.findAll({include: [Genres, Actors, Directors]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movies.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movies.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movies.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movies.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setMoviesGenres = catchError(async(req, res) => {
    const { id } = req.params;
    const movies = await Movies.findByPk(id)
    if(!movies) return res.status(404).json({message: "Genero no encontrada"})
    await movies.setGenres(req.body);
    const genres = await movies.getGenres();
    return res.json(genres);
});

const setMoviesActors = catchError(async(req, res) => {
    const { id } = req.params;
    const movies = await Movies.findByPk(id)
    if(!movies) return res.status(404).json({message: "Actor no encontrado"})
    await movies.setActors(req.body);
    const actors = await movies.getActors();
    return res.json(actors);
});

const setMoviesDirectors = catchError(async(req, res) => {
    const { id } = req.params;
    const movies = await Movies.findByPk(id);
    if(!movies) return res.status(404).json({message: "Director no encontrado"});
    await movies.setDirectors(req.body);
    const directors = await movies.getDirectors();
    return res.json(directors)
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMoviesGenres,
    setMoviesActors,
    setMoviesDirectors,
}