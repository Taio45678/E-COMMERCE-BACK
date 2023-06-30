const { Op } = require('sequelize');
const db = require('../db.js');
const buscarProductos = async (req, res) => {
  try {
    const { query } = req.body;

    const productos = await db.Producto.findAll({
      where: {
        [Op.or]: [
          { nombreproducto: { [Op.iLike]: `%${query}%` } }
        ]
      },
      include: {
        model: db.Categoria,
        where: {
          nombrecat: { [Op.iLike]: `%${query}%` }
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
