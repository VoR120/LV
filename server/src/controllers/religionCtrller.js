const Religion = require('../models/religionModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllReligion = getAll(Religion);

exports.findByIdReligion = findById(Religion);

exports.createReligion = create(Religion)

exports.updateByIdReligion = updateById(Religion);

exports.removeReligion = remove(Religion);

exports.removeAllReligion = removeAll(Religion);
