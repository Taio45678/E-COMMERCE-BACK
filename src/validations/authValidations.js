const { body, validationResult } = require('express-validator');
const joi = require('joi');

const { body, validationResult } = require('express-validator');
const joi = require('joi');

const validarContrasenaRegistro = [
  body('username').notEmpty().withMessage('El nombre es obligatorio'),
  body('login').isEmail().withMessage('El email no es válido'),
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .custom((value, { req }) => {
      const schema = joi.object({
        password: joi.string()
          .min(7).withMessage('La contraseña debe tener al menos 7 caracteres')
          .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
          .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número')
      });

      const { error } = schema.validate({ password: value });
      if (error) {
        throw new Error(error.details[0].message);
      }

      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validarContrasenaRegistro };


const validarInicioSesion = [
  body('login').isEmail().withMessage('El email no es válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validarContrasena, validarRegistro, validarInicioSesion };
