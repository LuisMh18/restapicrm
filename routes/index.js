const express = require('express');
const router = express.Router();
const clientes = require('../controllers/clientes');
const productos = require('../controllers/productos');

module.exports = function() {

    //clientes
    router.post('/clientes', clientes.create);
    router.get('/clientes', clientes.findAll);
    router.get('/clientes/:id', clientes.findOne);
    router.put('/clientes/:id', clientes.update);
    router.delete('/clientes/:id', clientes.delete);

    //productos
    router.post('/productos', productos.create);
    router.get('/productos', productos.findAll);
    router.get('/productos/:id', productos.findOne);
    router.put('/productos/:id', productos.update);
    router.delete('/productos/:id', productos.delete);
    
    return router;
}