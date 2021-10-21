const fLpM = require('../models/fLpMModel');
const { getAll, findById, updateById, remove, removeAll, create } = require('./utils');

exports.getAllfLpM = getAll(fLpM);

exports.findByIdfLpM = findById(fLpM);

exports.createfLpM = create(fLpM)

exports.updateByIdfLpM = updateById(fLpM);

exports.removefLpM = remove(fLpM);

exports.removeAllfLpM = removeAll(fLpM);
