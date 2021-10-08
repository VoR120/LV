const Discipline = require('../models/disciplineModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllDiscipline = getAll(Discipline);

exports.findByIdDiscipline = findById(Discipline);

exports.createDiscipline = create(Discipline);

exports.updateByIdDiscipline = updateById(Discipline);

exports.removeDiscipline = remove(Discipline);

exports.removeAllDiscipline = removeAll(Discipline);
