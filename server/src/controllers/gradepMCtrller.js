const gradepM = require('../models/gradepMModel');
const { getAll, findById, updateById, remove, removeAll, create } = require('./utils');

exports.getAllGradepM = getAll(gradepM);

exports.findByIdGradepM = (req, res) => {
    gradepM.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(400).json({ msg: "Not Found!" })
            } else
                res.status(500).send({
                    message:
                        err.message || "ERROR!"
                });
        }
        else res.status(200).json(data);
    })
};

exports.findByYearGradepM = (req, res) => {
    gradepM.findByYear(req.params.year, (err, data) => {
        if (err) {
            if (err.type == "not_found") {
                res.status(400).json({ msg: "Not Found!" })
            } else
                res.status(500).send({
                    message:
                        err.message || "ERROR!"
                });
        }
        else res.status(200).json(data);
    })
};

exports.getYearGradepM = (req, res) => {
    gradepM.getYear((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
};

exports.createGradepM = create(gradepM)

exports.updateByIdGradepM = updateById(gradepM);

exports.removeGradepM = remove(gradepM);

exports.removeAllGradepM = removeAll(gradepM);
