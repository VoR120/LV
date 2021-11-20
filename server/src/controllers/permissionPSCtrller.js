const PermissionPS = require('../models/permissionPSModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllPermissionPS = getAll(PermissionPS);

exports.findByIdPermissionPS = findById(PermissionPS);

exports.createPermissionPS = create(PermissionPS);

exports.updateByIdPermissionPS = updateById(PermissionPS);

exports.removePermissionPS = remove(PermissionPS);

exports.removeAllPermissionPS = removeAll(PermissionPS);
