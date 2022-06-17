/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const errHandler = require('./middlewares/errHandler');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use(auth, require('./routes/users'), createUser);
app.use(auth, require('./routes/cards'), login);

app.post('/signup', createUser);
app.post('/signin', login);
app.use('*', auth, (req, res, next) => { next(new NotFoundError('Страница по указанному URL не найдена')); });
app.use(errHandler);
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
