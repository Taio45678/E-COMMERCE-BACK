const { Producto, Categoria, Review} = require('../db.js');

const productValidations = require('../validations/productValidations');
// Controlador para obtener todos los productos
async function obtenerProductos(req, res) {
  const { page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;
  const offset = (pageNumber - 1) * pageSize;

  try {
    const { count, rows } = await Producto.findAndCountAll({
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
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener la lista de productos' });
  }

}

// Controlador para crear un nuevo producto
const crearProducto = async (req, res) => {
  try {
    const { id, nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, fotosecund,calificacionproducto, nombrecat } = req.body;

    // Validaciones de los datos del producto

   /* productValidations.validateNombreProducto({ nombreproducto });
    productValidations.validateDescProducto({ descproducto });
    productValidations.validateColorProducto({ colorproducto });
    productValidations.validateFotoPrinc({ fotoprinc });
    productValidations.validatePrecioProducto({ precioproducto });
    productValidations.validateDisponibProducto({ disponibproducto });
    productValidations.validateFotoSecund({ fotosecund });*/


    let categoria = await Categoria.findOne({
      where: {
        nombrecat: nombrecat.toLowerCase()
      }
    });

    if (!categoria) {
      categoria = await Categoria.create({
        nombrecat: nombrecat.toLowerCase(),
      });
    }

    const newProduct = await Producto.create({
      id,
      nombreproducto,
      descproducto,
      colorproducto,
      fotoprinc,
      precioproducto,
      disponibproducto,
      fotosecund,
      calificacionproducto,
      
    });
      await newProduct.addCategoria(categoria)
      console.log(Object.keys(newProduct))
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).json({ error: 'Error al crear un nuevo producto' });
  }
};


// Controlador para obtener un producto por su ID
async function obtenerProductoPorId(req, res) {
  const { id } = req.params;

  try {
    const respuesta = await Producto.findByPk(id, {include:[
      {model: Categoria,
      attributes: ['nombrecat']
    }, Review]
  });
    if (!respuesta) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    const {nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, categoria, reviews} = respuesta
    var namecat = categoria[0].nombrecat
    const producto = {id, nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, nombrecat: namecat, reviews}
    res.json(producto);
    console.log(JSON.stringify(respuesta))
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener el producto' });
  }
}

// Controlador para actualizar un producto
async function actualizarProducto(req, res) {
  const { id } = req.params;
  const { nombreproducto, descproducto, colorproducto, fotoprinc, precioproducto, disponibproducto, fotosecund,calificacionproducto, categoria } = req.body;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    producto.nombreproducto = nombreproducto;
    producto.descproducto = descproducto;
    producto.colorproducto = colorproducto;
    producto.fotoprinc = fotoprinc;
    producto.precioproducto = precioproducto;
    producto.disponibproducto = disponibproducto;
    producto.fotosecund = fotosecund;
    producto.calificacionproducto=calificacionproducto;
    


    /*productValidations.validateNombreProducto({nombreproducto});
    productValidations.validateDescProducto({descproducto});
    productValidations.validateColorProducto({colorproducto});
    productValidations.validateFotoPrinc({fotoprinc});
    productValidations.validatePrecioProducto({precioproducto});
    productValidations.validateDisponibProducto({disponibproducto});
    productValidations.validateFotoSecund({fotosecund});*/
    

   

    await producto.save();

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar el producto' });
  }
}

// Controlador para eliminar un producto
async function eliminarProducto(req, res) {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.destroy();

    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto' });
  }
}
const actualizarBorrador = async (req, res) => {
  const { id } = req.params;

  try {
    // Buscar el producto por ID
    const producto = await Producto.findByPk(id);
    
    if (!producto) {
      return res.status(404).send({ error: 'Producto no encontrado' });
    }
    
   
    // Actualizar el campo "borrador" a true
    producto.borrador = !producto.borrador;
    await producto.save();



    //await producto.update({ borrador: true });

    //return res.status(200).send({ message: 'Borrador actualizado correctamente' });
    return res.status(200).json(producto)
  } catch (error) {
    return res.status(500).send({ error: 'Error al actualizar el borrador' });
  }
};

module.exports =  
 {  
  obtenerProductos,
  crearProducto,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto,
  actualizarBorrador
};