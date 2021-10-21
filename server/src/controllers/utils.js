exports.getAll = (Model) => {
    return (req, res) => {
        Model.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ERROR!"
                });
            else res.status(200).json(data);
        })
    }
}

exports.findById = (Model) => {
    return (req, res) => {
        Model.findById(req.params.id, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ERROR!"
                });
            else res.status(200).json(data);
        })
    }
}

exports.create = (Model) => {
    return (req, res) => {
        Model.create(req.body, (err, data) => {
            if (err) {
                if (err.type == "duplicated") {
                    res.status(400).json({ msg: "Duplicated!" })
                } else
                    res.status(500).send({
                        message:
                            err.message || "ERROR!"
                    });
            }
            else res.status(201).json(data);
        })
    }
}

exports.updateById = (Model) => {
    return (req, res) => {
        Model.updateById(req.params.id, req.body, (err, data) => {
            if (err)
                if (err.type == "not_found") {
                    res.status(400).json({ msg: "Not found!" })
                } else {
                    res.status(500).json({
                        message:
                            err.message || "ERROR!"
                    });
                }

            else res.status(200).json(data);
        })
    }
}

exports.remove = (Model) => {
    return (req, res) => {
        Model.remove(req.params.id, (err, data) => {
            if (err)
                if (err.type == "not_found") {
                    res.status(400).json({ msg: "Not found!" })
                } else {
                    res.status(500).json({
                        message:
                            err.message || "ERROR!"
                    });
                }
            else res.status(200).json({ msg: "Deleted!" });
        })
    }
}

exports.removeAll = (Model) => {
    return (req, res) => {
        Model.removeAll((err, data) => {
            if (err) {
                if (err.type == "not_found") {
                    res.status(400).json({ msg: "Not found!" })
                } else {
                    res.status(500).json({
                        message:
                            err.message || "ERROR!"
                    });
                }
            }
            else res.status(200).json({ msg: "Delete All!" });
        })
    }
}

exports.getIdFromName = (Model) => {
    return (req, res) => {
        Model.getIdFromName(req.body.name, (err, data) => {
            if (err) {
                if (err.type == "not_found") {
                    res.status(400).json({ msg: "Not found!" })
                } else {
                    res.status(500).json({
                        message:
                            err.message || "ERROR!"
                    });
                }
            }
            else res.status(200).json(data);
        })
    }
}

exports.getNameFromId = (Model) => {
    return (req, res) => {
        Model.getNameFromId(req.body.id, (err, data) => {
            if (err) {
                if (err.type == "not_found") {
                    res.status(400).json({ msg: "Not found!" })
                } else {
                    res.status(500).json({
                        message:
                            err.message || "ERROR!"
                    });
                }
            }
            else res.status(200).json(data);
        })
    }
}