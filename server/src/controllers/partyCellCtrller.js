const PartyCell = require('../models/partyCellModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllPartyCell = getAll(PartyCell);

exports.findByIdPartyCell = findById(PartyCell);

exports.createPartyCell = create(PartyCell)

exports.updateByIdPartyCell = updateById(PartyCell);

exports.removePartyCell = remove(PartyCell);

exports.removeAllPartyCell = removeAll(PartyCell);
