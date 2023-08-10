const express = require('express');

const router = express.Router();

module.exports = function() {

    router.get('/', (req, res) => {
        res.send("iniico")
    });

    router.get('/nosotros', (req, res) => {
        res.send("nosotros");
    });
    
    return router;
}