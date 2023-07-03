const { Op } = require('sequelize');
const db = require('../db.js');

const buscarProductos = async (req, res) => {
  try {
    const { prod, cate, page, limit } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageSize;

    const whereCondition = {
      [Op.or]: [
        { nombreproducto: { [Op.iLike]: `%${prod}%` } }
      ]
    };

    if (cate) {
      whereCondition['$Categoria.nombrecat$'] = { [Op.iLike]: `%${cate}%` };
    }

    const { count, rows } = await db.Producto.findAndCountAll({
      where: whereCondition,
      include: {
        model: db.Categoria,
        required: true
      },
      offset,
      limit: pageSize,
    });

    const totalPages = Math.ceil(count / pageSize);

    res.json({
      totalProductos: count,
      totalPages,
      currentPage: pageNumber,
      pageSize,
      productos: rows,
    });
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
};

module.exports = buscarProductos;