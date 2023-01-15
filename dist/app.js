"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _package = _interopRequireDefault(require("../package.json"));
var _products = _interopRequireDefault(require("./routes/products.routes"));
var _auth = _interopRequireDefault(require("./routes/auth.routes"));
var _user = _interopRequireDefault(require("./routes/user.routes"));
var _inicio = require("./libs/inicio");
var _database = _interopRequireDefault(require("./database"));
var _mail = _interopRequireDefault(require("./routes/mail.routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var db = require('./database');
db.createConnection();
var app = (0, _express["default"])();
//Creamos los roles para que ya existan
(0, _inicio.createRoles)();
app.use(_express["default"].json());
//seteamos una variable
app.set('pkg', _package["default"]);
//devuelve las peticiones que se hacen
app.use((0, _morgan["default"])('dev'));
//ruta raiz
app.get('/', function (req, res) {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    version: app.get('pkg').version
  });
});

// connection.createConnection()

/*RUTAS*/

// Se puede sustituir por una colección de ejercicios
// app.use('/api',productRoutes)

// ESTO SE PONE PARA QUE NO DE ERROR EN LA PETICIÓN 
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Esto es una lista de las cabezeras permitidas en mi api
  res.header('Access-Control-Allow-Headers', 'x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Allow', 'GET, POST, PUT, DELETE');
  next();
});
app.use('/api', _auth["default"]);
app.use('/api', _user["default"]);
app.use('/api', _mail["default"]);
var _default = app;
exports["default"] = _default;