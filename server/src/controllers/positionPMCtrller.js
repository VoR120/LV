const PositionPM = require('../models/positionPMModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllPositionPM = getAll(PositionPM);

exports.findByIdPositionPM = findById(PositionPM);

exports.createPositionPM = create(PositionPM)

exports.updateByIdPositionPM = updateById(PositionPM);

exports.removePositionPM = remove(PositionPM);

exports.removeAllPositionPM = removeAll(PositionPM);
