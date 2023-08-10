const express = require('express');
const routes = require('./routes');

//crear el servidor
const app =  express();

app.set('port', process.env.PORT || 9000);

//rutas de la app
app.use('/', routes());


//puero
app.listen(app.get('port'), () => {
    console.log('server running on port ', app.get('port'));
});
