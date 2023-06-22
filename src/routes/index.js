const { getCategorias } = require('../controllers/getCategoria.js');
const { Router } = require('express');
const router = Router();

router.get("/categ",  getCategorias );


module.exports = router ;