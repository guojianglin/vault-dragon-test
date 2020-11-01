require('./db/mongoose')
const express = require('express')
const objectRouter = require('./routers/object')
const app = express();

app.use(express.json());
app.use(objectRouter)

module.exports = app  