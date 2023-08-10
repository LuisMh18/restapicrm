const express = require('express');
const router = express.Router();
const clientes = require('../controllers/clientes');

module.exports = function() {

    router.post('/clientes', clientes.create);
    router.get('/clientes', clientes.findAll);
    router.get('/clientes/:id', clientes.findOne);
    
    return router;
}