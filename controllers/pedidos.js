const Clientes = require('../models/Clientes');

exports.create = async(req, res, next) => {
    const cliente = new Clientes(req.body);

    try {
        //almacenar registro
        await cliente.save();
        res.json({
            mensaje: 'Se agrego un nuevo cliente'
        });
    } catch(e){
        console.log(e);
        next();
    }

};

exports.findAll = async(req, res, next) => {
    try {
        const clientes = await Clientes.find({});
        res.json(clientes);
    } catch(e){
        console.log(e);
        next();
    }
};

exports.findOne = async(req, res, next) => {

    try {
        const cliente = await Clientes.findById(req.params.id);
        if(!cliente){
            res.json({mensaje: 'El cliente no existe'});
            return next();
        }
        res.json(cliente);
    } catch(e){
        console.log(e);
        next();
    }
};

exports.update = async(req, res, next) => {
    try{
        const cliente = await Clientes.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        });

        res.json(cliente);

    } catch(e){
        console.log(e);
        next();
    }
};

exports.delete = async(req, res, next) => {
    try{
        await Clientes.findOneAndDelete({ _id: req.params.id });
        res.json({mensaje: 'El cliente se ha eliminado'});
    } catch(e){
        console.log(e);
        next();
    }
};