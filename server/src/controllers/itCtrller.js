const IT = require('../models/itModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllIT = getAll(IT);

exports.findByIdIT = findById(IT);

exports.createIT = create(IT, "Tên tin học");

exports.updateByIdIT = updateById(IT);

exports.removeIT = remove(IT);

exports.removeAllIT = removeAll(IT);
