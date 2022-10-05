const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { userValidation, loginValidation } = require('./middlewares/validation');
const userRoute = require('./routes/users');
const cardRoute = require('./routes/cards');
const auth = require('./middlewares/auth');
const { getUnfindError } = require('./errors/errors');
const { loginUser, createUser } = require('./controller/users');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(cookieParser());

app.use('/signin', loginValidation, loginUser);
app.use('/signup', userValidation, createUser);

app.use(auth);

app.use(userRoute);
app.use(cardRoute);
app.use('*', (req, res) => {
  getUnfindError(res, 'Указанный путь не существует.');
});
app.use(errors);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT);
