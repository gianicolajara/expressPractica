const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const exhbs = require('express-handlebars')

//configuracion hbs
app.set('views', path.join(__dirname, '/views'));
let hbs = exhbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'/layouts'),
    partialsDir: path.join(app.get('views'),'/partials'),
    extname: '.hbs'
});

//configuraciones
app.set('port', process.env.PORT || 5000);
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
app.enable('view cache');

//middleware
app.use(morgan('dev'));

//rutas
app.use(require('./routes'));

//rutas estaticas
app.use(express.static(path.join(__dirname, 'public')));

//puero servidor
app.listen(app.get('port'), () => {
    console.log(`servidor encendido en el puerto`, app.get('port'));
});