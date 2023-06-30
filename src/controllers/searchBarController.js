const { Op } = require('sequelize');
const db = require('../db.js');
const buscarProductos = async (req, res) => {
  try {
    //const { query } = req.body;
    const prod = req.query.prod;
    const cate = req.query.cate;
    const productos = await db.Producto.findAll({
      where: {
        [Op.or]: [
          { nombreproducto: { [Op.iLike]: `%${prod}%` } }
        ]
      },
      include: {
        model: db.Categoria,
        where: {
          nombrecat: { [Op.iLike]: `%${cate}%` }
        },
        required: true
      }
    });
    res.json(productos);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
};
module.exports = buscarProductos;


