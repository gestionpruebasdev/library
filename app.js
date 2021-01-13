const express = require('express');
const bodyparser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const routes = require('./bin/routes/book');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyparser.json());

app.use('/api/v1', routes);

module.exports = app;