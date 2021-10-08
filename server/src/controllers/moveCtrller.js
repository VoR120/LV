const Move = require('../models/moveModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllMove = getAll(Move);

exports.findByIdMove = findById(Move);

exports.createMove = create(Move);

exports.updateByIdMove = updateById(Move);

exports.removeMove = remove(Move);

exports.removeAllMove = removeAll(Move);
