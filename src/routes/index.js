const express = require('express');
const genreRouter = require('./genre.router');
const actorRouter = require('./actor.router');
const directoRouter = require('./director.router');
const movieRouter = require('./movie.router');
const { setMoviesGenres, setMoviesActors } = require('../controllers/movie.controllers');
const router = express.Router();

// colocar las rutas aquí
router.use(genreRouter)
router.use(actorRouter)
router.use(directoRouter)
router.use(movieRouter)
router.use(setMoviesGenres)
router.use(setMoviesActors)
module.exports = router;