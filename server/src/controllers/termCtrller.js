const Term = require('../models/termModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllTerm = getAll(Term);

exports.findByIdTerm = findById(Term);

exports.createTerm = create(Term, "Nhiệm kỳ");

exports.updateByIdTerm = updateById(Term);

exports.removeTerm = remove(Term);

exports.removeAllTerm = removeAll(Term);
