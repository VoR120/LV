const Discipline = require('../models/disciplineModel');
const { getAll, findById, create, updateById, remove, removeAll } = require('./utils');

exports.getAllDiscipline = (req, res) => {
    Discipline.getAll(req.query, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
};;

exports.findByIdDiscipline = findById(Discipline);

exports.findByTypeIdDiscipline = (req, res) => {
    Discipline.findByTypeId(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        else res.status(200).json(data);
    })
};

exports.createDiscipline = create(Discipline);

exports.updateByIdDiscipline = updateById(Discipline);

exports.removeDiscipline = remove(Discipline);

exports.removeAllDiscipline = removeAll(Discipline);
