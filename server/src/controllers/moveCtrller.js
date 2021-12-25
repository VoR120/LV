const { findByType } = require('../models/moveModel');
const Move = require('../models/moveModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllMove = (req, res) => {
    Move.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
};

exports.findByIdMove = findById(Move);

exports.findByTypeMove = (req, res) => {
    Move.findByType(req.query, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        }
        else res.status(200).json(data);
    })
};

exports.findByTypeIdMove = (req, res) => {
    Move.findByTypeId(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
};

exports.findByPMId = (req, res) => {
    Move.findByPMId(req.query, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(400).json({ msg: "Không tìm thấy Đảng viên!" })
            } else
                res.status(500).send({
                    message:
                        err.message || "ERROR!"
                });
        }
        else res.status(200).json(data);
    })
}

exports.createMove = create(Move);

exports.updateByIdMove = updateById(Move);

exports.removeMove = remove(Move);

exports.removeAllMove = removeAll(Move);
