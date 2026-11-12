const helmet = require('helmet');
const cors = require('cors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./config/database');
const categorieRouter = require('./routes/categories');
const specialiteRouter = require('./routes/specialites');
const artisanRouter = require('./routes/artisans');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// securise des entêtes HTTP pour protéger l'application contre certaines vulnérabilités web
app.use(helmet());
//autoriser les requêtes cross-origin (CORS) pour permettre à des domaines différents d'accéder aux ressources de l'application
app.use(cors({
  origin: 'http://localhost:5173'
}));


//Limiter le nombre de requêtes qu'un client peut effectuer sur une période donnée pour éviter les abus et les attaques par déni de service (DoS)
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite chaque IP à 100 requêtes par fenêtre (ici, par 15 minutes)
  message: 'Trop de requêtes, veuillez réessayer plus tard.'
});
app.use('/api', limiter);




sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données:', err);
  });



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/categories', categorieRouter);
app.use('/api/specialites', specialiteRouter);
app.use('/api/artisans', artisanRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;
