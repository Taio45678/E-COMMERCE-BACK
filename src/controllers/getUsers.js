const { Usuario } = require('../db.js');

const getUsers = async (req, res, next) => {
  try {
    const users = await Usuario.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};



module.exports = 
  getUsers;

const createUser = async (req, res, next) => {
  try {
    const { login, username, password, rol } = req.body;

    const newUser = await Usuario.create({
      login,
      username,
      password,
      rol,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
};

