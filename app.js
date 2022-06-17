/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use(require('./routes/users'));
app.use(require('./routes/cards'));

app.use((req, res) => { res.status(404).send({ message: 'Страница по указанному маршруту не найдена' }); });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
