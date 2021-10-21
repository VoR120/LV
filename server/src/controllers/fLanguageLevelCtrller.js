const FLanguageLevel = require('../models/fLanguageLevelModel');
const { getAll, findById, findByFlId, create, updateById, remove, removeAll } = require('./utils');

exports.getAllFLanguageLevel = getAll(FLanguageLevel);

exports.findByIdFLanguageLevel = findById(FLanguageLevel);

exports.findByFlIdFLanguageLevel = (req, res) => {
    FLanguageLevel.findByFlId(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
};

exports.createFLanguageLevel = create(FLanguageLevel)

exports.updateByIdFLanguageLevel = updateById(FLanguageLevel);

exports.removeFLanguageLevel = remove(FLanguageLevel);

exports.removeAllFLanguageLevel = removeAll(FLanguageLevel);
