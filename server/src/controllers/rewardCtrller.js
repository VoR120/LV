const Reward = require('../models/rewardModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllReward = getAll(Reward);

exports.findByIdReward = findById(Reward);

exports.createReward = create(Reward);

exports.updateByIdReward = updateById(Reward);

exports.removeReward = remove(Reward);

exports.removeAllReward = removeAll(Reward);
