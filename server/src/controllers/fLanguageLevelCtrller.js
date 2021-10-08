const FLanguageLevel = require('../models/fLanguageLevelModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllFLanguageLevel = getAll(FLanguageLevel);

exports.findByIdFLanguageLevel = findById(FLanguageLevel);

exports.createFLanguageLevel = create(FLanguageLevel)

exports.updateByIdFLanguageLevel = updateById(FLanguageLevel);

exports.removeFLanguageLevel = remove(FLanguageLevel);

exports.removeAllFLanguageLevel = removeAll(FLanguageLevel);
