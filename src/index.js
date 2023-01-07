require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded());

app.use('/', routes);

mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true});
mongoose.set('strictQuery', true);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log("Connected to database"));

app.listen(port, () => {
    console.log(`O app está ouvindo na porta ${port}!`);
});
