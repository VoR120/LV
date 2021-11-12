const { filter } = require('../models/partyMemberModel');
const PartyMember = require('../models/partyMemberModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

exports.getAllPartyMember = (req, res) => {
    console.log("Query: ", req.query);
    isEmpty(req.query)
        ? PartyMember.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ERROR!"
                });
            else res.status(200).json(data);
        })
        : PartyMember.filter(req.query, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ERROR!"
                });
            else res.status(200).json(data);
        })
};

exports.findByIdPartyMember = findById(PartyMember);

exports.filterPartyMember = (req, res) => {
    Model.findById(req.params, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
}

exports.createPartyMember = create(PartyMember)

exports.updateByIdPartyMember = updateById(PartyMember);

exports.removePartyMember = remove(PartyMember);

exports.removeAllPartyMember = removeAll(PartyMember);
