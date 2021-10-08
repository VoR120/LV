const Position = require('../models/positionModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllPosition = getAll(Position);

exports.findByIdPosition = findById(Position);

exports.createPosition = create(Position)

exports.updateByIdPosition = updateById(Position);

exports.removePosition = remove(Position);

exports.removeAllPosition = removeAll(Position);
