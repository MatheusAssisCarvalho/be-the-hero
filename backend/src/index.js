const express = require('express');
const cors = require('cors'); // Parte de segurança (será utilizado depois)
const routes = require('./routes'); // Rotas ligando os controllers

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);
