const express = require('express');
const router = express.Router();
const clientes = require('../controllers/clientes');
const productos = require('../controllers/productos');
const pedidos = require('../controllers/pedidos');

module.exports = function() {

    //clientes
    router.post('/clientes', clientes.create);
    router.get('/clientes', clientes.findAll);
    router.get('/clientes/:id', clientes.findOne);
    router.put('/clientes/:id', clientes.update);
    router.delete('/clientes/:id', clientes.delete);

    //productos
    router.post('/productos', productos.subirArchivo, productos.create);
    router.get('/productos', productos.findAll);
    router.get('/productos/:id', productos.findOne);
    router.put('/productos/:id', productos.subirArchivo, productos.update);
    router.delete('/productos/:id', productos.delete);

    //pedidos
    router.post('/pedidos', pedidos.create);
    router.get('/pedidos', pedidos.findAll);
    router.get('/pedidos/:id', pedidos.findOne);
    router.put('/pedidos/:id', pedidos.update);
    router.delete('/pedidos/:id', pedidos.delete);
    
    return router;
}