const { getAll, create, getOne, remove, update, setMoviesGenres, setMoviesActors, setMoviesDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/movies')
    .get(getAll)
    .post(create);

movieRouter.route('/movies/:id')
    .get(getOne)
    .delete(remove)
    .put(update)

movieRouter.route('/movies/:id/genres')
    .post(setMoviesGenres)


movieRouter.route('/movies/:id/actors')
    .post(setMoviesActors) 
    

movieRouter.route('/movies/:id/directors')
    .post(setMoviesDirectors)

module.exports = movieRouter;