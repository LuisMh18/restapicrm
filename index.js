const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/crm', {
    useNewUrlParser: true
});

//crear el servidor
const app =  express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 9000);

//rutas de la app
app.use('/', routes());


//puero
app.listen(app.get('port'), () => {
    console.log('server running on port ', app.get('port'));
});
