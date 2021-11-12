const Reward = require('../models/rewardModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllReward = getAll(Reward);

exports.findByIdReward = findById(Reward);

exports.findByTypeIdReward = (req, res) => {
    Reward.findByTypeId(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
};

exports.createReward = create(Reward);

exports.updateByIdReward = updateById(Reward);

exports.removeReward = remove(Reward);

exports.removeAllReward = removeAll(Reward);
