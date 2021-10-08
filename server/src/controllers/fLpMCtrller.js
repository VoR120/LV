const fLpM = require('../models/fLpMModel');
const { getAll, findById, updateById, remove, removeAll } = require('./utils');

exports.getAllfLpM = getAll(fLpM);

exports.findByIdfLpM = findById(fLpM);

exports.createfLpM = (req, res) => {
    fLpM.create(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.send(data);
    })
}

exports.updateByIdfLpM = updateById(fLpM);

exports.removefLpM = remove(fLpM);

exports.removeAllfLpM = removeAll(fLpM);
