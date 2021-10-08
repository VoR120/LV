const PartyMember = require('../models/partyMemberModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllPartyMember = getAll(PartyMember);

exports.findByIdPartyMember = findById(PartyMember);

exports.createPartyMember = create(PartyMember)

exports.updateByIdPartyMember = updateById(PartyMember);

exports.removePartyMember = remove(PartyMember);

exports.removeAllPartyMember = removeAll(PartyMember);
