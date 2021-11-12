const Address = require('../models/addressModel');
const { getAll, findById, updateById, remove, removeAll, create } = require('./utils');

exports.createAddress = (req, res) => {
    Address.create(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        }
        else res.status(201).json(data);
    })
}

exports.getByIdAddress = findById(Address);

exports.updateByIdAddress = updateById(Address)

exports.removeAddress = remove(Address)
