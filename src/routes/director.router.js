const { getAll, create, getOne, remove, update } = require('../controllers/director.controllers');
const express = require('express');

const directoRouter = express.Router();

directoRouter.route('/directors')
    .get(getAll)
    .post(create);

directoRouter.route('/directors/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = directoRouter;