const FLanguage = require('../models/fLanguageModel');
const { getAll, findById, create, updateById, remove, removeAll, getIdFromName } = require('./utils');

exports.getAllFLanguage = getAll(FLanguage);

exports.findByIdFLanguage = findById(FLanguage);

exports.createFLanguage = create(FLanguage)

exports.updateByIdFLanguage = updateById(FLanguage);

exports.removeFLanguage = remove(FLanguage);

exports.removeAllFLanguage = removeAll(FLanguage);

exports.getIdFromNameFLanguage = getIdFromName(FLanguage);