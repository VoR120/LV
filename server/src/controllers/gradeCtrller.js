const { findOne } = require('../models/gradeModel');
const Grade = require('../models/gradeModel');
const { getAll, create, findById, updateById, remove, removeAll } = require('./utils');

exports.getAllGrade = getAll(Grade);

exports.findOneGrade = (req, res) => {
    Grade.findOne(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "ERROR!"
            });
        }
        else res.status(200).json(data);
    })
};;

exports.findByIdGrade = findById(Grade);

exports.createGrade = create(Grade, "Tên loại")

exports.updateByIdGrade = updateById(Grade);

exports.removeGrade = remove(Grade);

exports.removeAllGrade = removeAll(Grade);
