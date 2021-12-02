const PermissionPM = require('../models/permissionPMModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllPermissionPM = getAll(PermissionPM);

exports.findByIdPermissionPM = findById(PermissionPM);

exports.createPermissionPM = create(PermissionPM);

exports.updateByIdPermissionPM = updateById(PermissionPM);

exports.removePermissionPM = remove(PermissionPM);

exports.removeAllPermissionPM = removeAll(PermissionPM);
