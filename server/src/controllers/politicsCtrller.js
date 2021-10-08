const Politics = require('../models/politicsModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllPolitics = getAll(Politics);

exports.findByIdPolitics = findById(Politics);

exports.createPolitics = create(Politics)

exports.updateByIdPolitics = updateById(Politics);

exports.removePolitics = remove(Politics);

exports.removeAllPolitics = removeAll(Politics);
