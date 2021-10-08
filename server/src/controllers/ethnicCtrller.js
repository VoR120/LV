const Ethnic = require('../models/ethnicModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllEthnic = getAll(Ethnic);

exports.findByIdEthnic = findById(Ethnic);

exports.createEthnic = create(Ethnic)

exports.updateByIdEthnic = updateById(Ethnic);

exports.removeEthnic = remove(Ethnic);

exports.removeAllEthnic = removeAll(Ethnic);
