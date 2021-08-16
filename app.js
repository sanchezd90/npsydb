//dependiencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const {verifyUser, verifyAdmin} = require('./middlewares/auth');
const multer = require('multer');

//dotenv
dotenv.config();

//routes
//--all--
const indexRouter = require('./routes/index');
const registro = require('./routes/registro');
const login = require('./routes/login');
const publicacion = require('./routes/publicacion');

//--users--
const usersRouter = require('./routes/user/users');

//--contributors--

//--admins--
const adminIndex = require('./routes/admin/index');
const adminPruebas = require('./routes/admin/pruebas');
const adminPropositos = require('./routes/admin/propositos');
const adminDominios = require('./routes/admin/dominios');
const adminUsuarios = require('./routes/admin/usuarios');

//express
const app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : '1234',
  cookie : {maxAge: null},
  resave: true,
  saveUninitialized : false
}))

//--all--
app.use('/', indexRouter);
app.use('/registro',registro);
app.use('/login',login);
app.use('/publicacion',publicacion);

//--users
app.use('/users',verifyUser, usersRouter);

//--contributors--

//--admins--
app.use('/admin',verifyAdmin, adminIndex);
app.use('/admin/pruebas', adminPruebas);
app.use('/admin/propositos', adminPropositos);
app.use('/admin/dominios', adminDominios);
app.use('/admin/usuarios', adminUsuarios);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
