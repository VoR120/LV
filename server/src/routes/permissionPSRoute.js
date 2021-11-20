const express = require('express');
const {
    getAllPermissionPS,
    findByIdPermissionPS,
    createPermissionPS,
    removePermissionPS,
    removeAllPermissionPS,
    updateByIdPermissionPS
} = require('../controllers/permissionPSCtrller');
const Router = express.Router();

Router.get('/permissionps', getAllPermissionPS);
Router.get('/permissionps/:id', findByIdPermissionPS);
Router.post('/permissionps/create', createPermissionPS);
Router.put('/permissionps/:id', updateByIdPermissionPS);
Router.delete('/permissionps/:id', removePermissionPS);
Router.delete('/permissionps/removeall', removeAllPermissionPS);

module.exports = Router;