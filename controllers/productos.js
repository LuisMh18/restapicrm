const Productos = require('../models/Productos');


const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato No válido'))
        }
    },
}

// pasar la configuración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo 
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function(error) {
        if(error) {
            res.json({mensaje: error})
        }
        return next();
    })
}

exports.create = async(req, res, next) => {
    const producto = new Productos(req.body);

    try {
        //verificamos si subieron un archivo
        if(req.file.filename){
            producto.imagen = req.file.filename;
        }
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
        res.json(productos);
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
            return next();
        }
        res.json(producto);
    } catch(e){
        console.log(e);
        next();
    }
};

exports.update = async(req, res, next) => {
    try{
        //construir un nuevo producto
        let nuevoProducto = req.body;

        //verificar si hay una imagen
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        } else {
            //buscar producto
            let productoAnterior = await Productos.findById(req.params.id);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        const producto = await Productos.findOneAndUpdate({ _id: req.params.id }, nuevoProducto, {
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
        res.json({mensaje: 'El producto se ha eliminado'});
    } catch(e){
        console.log(e);
        next();
    }
};