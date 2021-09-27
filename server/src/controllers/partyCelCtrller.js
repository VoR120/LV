const PartyCell = require('../models/partyCellModel');

exports.getAllPartyCell = (req, res) => {
    PartyCell.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.send(data);
    })
}

exports.findByIdPartyCell = (req, res) => {
    PartyCell.findById(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.send(data);
    })
}

exports.createPartyCell = (req, res) => {
    PartyCell.create(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.send(data);
    })
}

exports.updatePartyCell = (req, res) => {
    PartyCell.updateById(req.params.id, req.body, (err, data) => {
        if (err)
            if (err.type = "not_found") {
                res.status(400).json({ msg: "Not found!" })
            } else {
                res.status(500).json({
                    message:
                        err.message || "ERROR!"
                });
            }

        else res.send(data);
    })
}

exports.deletePartyCell = (req, res) => {
    PartyCell.delete(req.params.id, (err, data) => {
        if (err)
            if (err.type = "not_found") {
                res.status(400).json({ msg: "Not found!" })
            } else {
                res.status(500).json({
                    message:
                        err.message || "ERROR!"
                });
            }
        else res.send({ msg: "Deleted!" });
    })
}

exports.deleteAll = (req, res) => {
    PartyCell.deleteAll((err, data) => {
        if (err) {
            if (err.type = "not_found") {
                res.status(400).json({ msg: "Not found!" })
            } else {
                res.status(500).json({
                    message:
                        err.message || "ERROR!"
                });
            }
        }
        else res.send({ msg: "Delete All!" });
    })
}
