const { Op } = require('sequelize');
const db = require('../db.js');

const buscarProductos = async (req, res) => {
  try {
    const { prod, cate, page, limit, color, price } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageSize;
    const arrayCondiciones = []
    var condicionCat =""
      
    const orden = []
    arrayCondiciones.push({borrador: false})

    if(prod){
      arrayCondiciones.push({ nombreproducto: { [Op.iLike]: `%${prod}%` } })
    }
    if(cate){
      condicionCat = {nombrecat : cate}
    }
    if(color){
      arrayCondiciones.push({colorproducto: {[Op.overlap]: [color]}})
    }
    if(price){
      orden.push('precioproducto')
      if(price === "up") orden.push('ASC')
      if(price === 'down') orden.push('DESC')
    }

    if(price){
      const { count, rows } = await db.Producto.findAndCountAll({
        order: [
          orden
        ],
        where: {
          [Op.and]:
          arrayCondiciones

        },
        include: {
          model: db.Categoria,
          where: condicionCat,
          attributes: ['nombrecat'],
          through: {attributes: []},
          required: true
        },
        offset: offset,
        limit: pageSize,
      });
      const totalPages = Math.ceil(count / pageSize);
      const arrayRespuesta = []
      rows.forEach(producto => {
        const {id, nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, categoria} = producto
        var namecat = categoria[0].nombrecat
        const productoFinal = {id, nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, nombrecat: namecat}
        arrayRespuesta.push(productoFinal)
      });

      res.json({
        totalProductos: count,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        productos: arrayRespuesta,
      });
      console.log(JSON.stringify({
        arrayRespuesta,
      }))
    }else {
      const { count, rows } = await db.Producto.findAndCountAll({
        where: {
          [Op.and]:
          arrayCondiciones
        },
        include: {
          model: db.Categoria,
          where: condicionCat,
          attributes: ['nombrecat'],
          through: {attributes: []},
          required: true
        },
        offset: offset,
        limit: pageSize,
      });
      const totalPages = Math.ceil(count / pageSize);
      const arrayRespuesta = []
      rows.forEach(producto => {
        const {id, nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, categoria} = producto
        var namecat = categoria[0].nombrecat
        const productoFinal = {id, nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, nombrecat: namecat}
        arrayRespuesta.push(productoFinal)
      });
      res.json({
        totalProductos: count,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        productos: arrayRespuesta,
      });
      console.log(JSON.stringify({
        arrayRespuesta,
      }))
    }

    
  } catch (error) {
    console.error('Error al buscar productos:', error);
    res.status(500).json({ error: 'Error al buscar productos' });
  }
};

module.exports = buscarProductos;