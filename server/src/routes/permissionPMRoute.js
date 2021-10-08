const express = require('express');
const {
    getAllPermissionPM,
    findByIdPermissionPM,
    createPermissionPM,
    // updateByIdPermissionPM,
    removePermissionPM,
    removeAllPermissionPM
} = require('../controllers/permissionPMCtrller');
const Router = express.Router();

Router.get('/permissionpm', getAllPermissionPM);
Router.get('/permissionpm/:id', findByIdPermissionPM);
Router.post('/permissionpm/create', createPermissionPM);
// Router.put('/permissionpm/:id', updateByIdPermissionPM);
Router.delete('/permissionpm/:id', removePermissionPM);
Router.delete('/permissionpm/removeall', removeAllPermissionPM);

module.exports = Router;