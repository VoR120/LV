const Permission = require('../models/permissionModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllPermission = getAll(Permission);

exports.findByIdPermission = findById(Permission);

exports.createPermission = create(Permission);

exports.updateByIdPermission = updateById(Permission);

exports.removePermission = remove(Permission);

exports.removeAllPermission = removeAll(Permission);
