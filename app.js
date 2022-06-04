/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, _res, next) => {
  req.user = {
    _id: '6298e0d6e80a777217671160',
  };
  next();
});
app.use(require('./routes/users'));
app.use(require('./routes/cards'));

app.use((req, res) => { res.status(404).send({ message: 'Страница по указанному маршруту не найдена' }); });
mongoose.connect('mongodb://localhost:27017/mydb');
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
