const express = require('express');
const {
    getAllPermission,
    findByIdPermission,
    createPermission,
    updateByIdPermission,
    removePermission,
    removeAllPermission
} = require('../controllers/permissionCtrller');
const Router = express.Router();

Router.get('/permission', getAllPermission);
Router.get('/permission/:id', findByIdPermission);
Router.post('/permission/create', createPermission);
Router.put('/permission/:id', updateByIdPermission);
Router.delete('/permission/:id', removePermission);
Router.delete('/permission/removeall', removeAllPermission);

module.exports = Router;