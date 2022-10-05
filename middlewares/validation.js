const { celebrate, Joi } = require('celebrate');

const idValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24),
  }),
});

const cardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const changeInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const changeAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
});

module.exports = {
  idValidation,
  cardValidation,
  userValidation,
  loginValidation,
  changeInfoValidation,
  changeAvatarValidation,
};
