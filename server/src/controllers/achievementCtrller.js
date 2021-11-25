const Achievement = require('../models/achievementModel');
const { getAll, findById, create, updateById, remove } = require('./utils');

exports.getAllAchievement = getAll(Achievement);

exports.findByIdAchievement = findById(Achievement);

exports.createAchievement = create(Achievement, "Tên thành tích")

exports.updateByIdAchievement = updateById(Achievement);

exports.removeAchievement = remove(Achievement);
