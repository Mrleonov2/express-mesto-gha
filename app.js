/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const errHandler = require('./middlewares/errHandler');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const regExp = require('./utils/regExp');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(regExp)),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}), login);
app.use(auth, routerUser);
app.use(auth, routerCard);
app.use('*', auth, (req, res, next) => { next(new NotFoundError('Страница по указанному URL не найдена')); });
app.use(errors());

app.use(errHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
