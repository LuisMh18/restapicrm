const Productos = require('../models/Productos');

exports.create = async(req, res, next) => {
    const producto = new Productos(req.body);

    try {
        //almacenar registro
        await producto.save();
        res.json({
            mensaje: 'Se agrego un nuevo producto'
        });
    } catch(e){
        console.log(e);
        next();
    }

};

exports.findAll = async(req, res, next) => {
    try {
        const productos = await Productos.find({});
        res.json(clientes);
    } catch(e){
        console.log(e);
        next();
    }
};

exports.findOne = async(req, res, next) => {

    try {
        const producto = await Productos.findById(req.params.id);
        if(!producto){
            res.json({mensaje: 'El producto no existe'});
        }
        res.json(producto);
    } catch(e){
        console.log(e);
        next();
    }
};

exports.update = async(req, res, next) => {
    try{
        const producto = await Productos.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        });

        res.json(producto);

    } catch(e){
        console.log(e);
        next();
    }
};

exports.delete = async(req, res, next) => {
    try{
        await Productos.findOneAndDelete({ _id: req.params.id });
        res.json({mensaje: 'El cliente se ha eliminado'});
    } catch(e){
        console.log(e);
        next();
    }
};