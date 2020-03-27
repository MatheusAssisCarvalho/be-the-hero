const express = require('express');
const cors = require('cors'); // Parte de segurança (será utilizado depois)
const { errors } = require('celebrate')
const routes = require('./routes'); // Rotas ligando os controllers

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
