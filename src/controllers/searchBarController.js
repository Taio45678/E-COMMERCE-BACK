const { Producto, Categoria } = require('../db.js');

const buscarProductos = async (req, res) => {
  try {
    const { producto, categoria } = req.query;
    let whereCondition = {};

    if (producto) {
      whereCondition[Op.or] = [
        { nombreproducto: { [Op.iLike]: `%${producto}%` } },
        { descproducto: { [Op.iLike]: `%${producto}%` } },
        { colorproducto: { [Op.iLike]: `%${producto}%` } },
      ];
    }

    if (categoria) {
      whereCondition.categoria = categoria.toLowerCase();
    }

    // Lógica para buscar productos en la base de datos
    const productos = await Producto.findAll({
      where: whereCondition,
      include: [Categoria] // Incluir la asociación con el modelo de Categoria
    });

    res.json(productos);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
};

module.exports = buscarProductos;
