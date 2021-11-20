const Type = require('../models/typeModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllType = getAll(Type);

exports.findByIdType = findById(Type);

exports.createType = create(Type, "Tên hình thức");

exports.updateByIdType = updateById(Type);

exports.removeType = remove(Type);

exports.removeAllType = removeAll(Type);
