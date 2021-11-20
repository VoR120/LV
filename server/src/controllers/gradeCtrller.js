const Grade = require('../models/gradeModel');
const { getAll, create, findById, updateById, remove, removeAll } = require('./utils');

exports.getAllGrade = getAll(Grade);

exports.findByIdGrade = findById(Grade);

exports.createGrade = create(Grade, "Tên loại")

exports.updateByIdGrade = updateById(Grade);

exports.removeGrade = remove(Grade);

exports.removeAllGrade = removeAll(Grade);
