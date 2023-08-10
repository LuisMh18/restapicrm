const Pedidos = require('../models/Pedidos');

exports.create = async(req, res, next) => {
    const pedido = new Pedidos(req.body);

    try {
        //almacenar registro
        await pedido.save();
        res.json({ mensaje: 'Se agrego un nuevo pedido' });
    } catch(e){
        console.log(e);
        next();
    }

};

exports.findAll = async(req, res, next) => {
    try {
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });
        res.json(pedidos);
    } catch(e){
        console.log(e);
        next();
    }
};

exports.findOne = async(req, res, next) => {

    try {
        const pedido = await Pedidos.findById(req.params.id).populate('cliente').populate({
            path:'pedido.producto',
            model:'Productos'
        });
        if(!pedido){
            res.json({mensaje: 'El pedido no existe'});
            return next();
        }
        res.json(pedido);
    } catch(e){
        console.log(e);
        next();
    }
};

exports.update = async(req, res, next) => {
    try{
        const pedido = await Pedidos.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true
        }).populate('cliente')
          .populate({
                path:'pedido.producto',
                model:'Productos'
            });

        res.json(pedido);

    } catch(e){
        console.log(e);
        next();
    }
};

exports.delete = async(req, res, next) => {
    try{
        await Pedidos.findOneAndDelete({ _id: req.params.id });
        res.json({mensaje: 'El pedido se ha eliminado'});
    } catch(e){
        console.log(e);
        next();
    }
};