const { filter } = require('../models/partyMemberModel');
const PartyMember = require('../models/partyMemberModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

const isEmpty = (obj) => {
    return Object.keys(obj).length === 0;
}

exports.getAllPartyMember = (req, res) => {
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

exports.createPartyMember = create(PartyMember, "Mã số Đảng viên")

exports.updateByIdPartyMember = updateById(PartyMember);

exports.removePartyMember = remove(PartyMember);

exports.removeAllPartyMember = removeAll(PartyMember);

exports.mailingPartyMember = (req, res) => {
    PartyMember.mailing(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
}