const { findByType } = require('../models/moveModel');
const Move = require('../models/moveModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllMove = getAll(Move);

exports.findByIdMove = findById(Move);

exports.findByTypeMove = (req, res) => {
    Move.findByType(req.body.LoaiHinhThuc, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
};

exports.findByTypeIdMove = (req, res) => {
    Move.findByTypeId(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
};

exports.createMove = create(Move);

exports.updateByIdMove = updateById(Move);

exports.removeMove = remove(Move);

exports.removeAllMove = removeAll(Move);
