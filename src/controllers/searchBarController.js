const { Producto, Categoria } = require('../db.js');

const buscarProductos = async (req, res) => {
  try {
    const { PRODUCTO, CATEGORIA } = req.query;
    let whereCondition = {};

    if (PRODUCTO) {
      whereCondition[Op.or] = [
        { nombreproducto: { [Op.iLike]: `%${PRODUCTO}%` } },
        { descproducto: { [Op.iLike]: `%${PRODUCTO}%` } },
        { colorproducto: { [Op.iLike]: `%${PRODUCTO}%` } },
      ];
    }

    if (CATEGORIA) {
      whereCondition.categoria = CATEGORIA.toLowerCase();
    }

   
    const productos = await Producto.findAll({
      where: whereCondition,
      include: [Categoria] 
    });

    res.json(productos);
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
};

module.exports = buscarProductos;
