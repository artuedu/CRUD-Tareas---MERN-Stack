const express = require('express');
//Impresion en consola de las peticiones al server
const morgan = require('morgan');
//Creacion de rutas
const path = require('path');
//Base de datos
const {mongoose} = require('./database');

const app = express();

//Setings
app.set('port', process.env.PORT || 3000);

//----------
//Middlewares
//----------

//Configuracion de morgan
app.use(morgan('dev'));

//Configuracion de json
app.use(express.json());


//----------
//Routes
//----------
app.use('/api/tasks', require('./routes/task.routes'));

//----------
//Static files
//----------
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.resolve(__dirname, './public')));

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});