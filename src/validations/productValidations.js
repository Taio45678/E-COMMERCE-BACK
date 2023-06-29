function validateNombreProducto(producto) {
  if (!producto.nombreproducto) { throw new Error('El nombre del producto es requerido');  }
  if (typeof producto.nombreproducto !== 'string') { throw new Error('El nombre del producto debe ser una cadena de caracteres');  }
  if (producto.nombreproducto.length < 3 || producto.nombreproducto.length > 100) { throw new Error('El nombre del producto debe tener entre 3 y 100 caracteres'); }
}

function validateDescProducto(producto) {
  if (!producto.descproducto) { throw new Error('La descripción del producto es requerida');  }
  if (typeof producto.descproducto !== 'string') {  throw new Error('La descripción del producto debe ser una cadena de caracteres');  }
  if (producto.descproducto.length < 10 || producto.descproducto.length > 500) {  throw new Error('La descripción del producto debe tener entre 10 y 500 caracteres');  }
}

function validateColorProducto(producto) {
  if (!producto.colorproducto) { throw new Error('El color del producto es requerido');  }
  if (typeof producto.colorproducto !== 'string') {    throw new Error('El color del producto debe ser una cadena de caracteres');  }
  if (producto.colorproducto.length < 3 || producto.colorproducto.length > 50) {  throw new Error('El color del producto debe tener entre 3 y 50 caracteres');  }
}

function validateFotoPrinc(producto) {
  if (!producto.fotoprinc) { throw new Error('La foto principal del producto es requerida');  }
  if (typeof producto.fotoprinc !== 'string') {  throw new Error('La foto principal del producto debe ser una cadena de caracteres'); }
  // Puedes agregar validaciones adicionales para la URL de la foto principal si lo deseas
}

function validatePrecioProducto(producto) {
  if (!producto.precioproducto) {  throw new Error('El precio del producto es requerido'); }
  if (typeof producto.precioproducto !== 'number') {  throw new Error('El precio del producto debe ser un número');  }
  if (producto.precioproducto <= 0) {   throw new Error('El precio del producto debe ser mayor que cero');  }
}

function validateDisponibProducto(producto) {  
  if (!producto.disponibproducto) {   throw new Error('La disponibilidad del producto es requerida');  }
  if (typeof producto.disponibproducto !== 'boolean') {   throw new Error('La disponibilidad del producto debe ser un valor booleano');  }
}

function validateFotoSecund(producto) {
  // if (!producto.fotosecund) {  throw new Error('La foto secundaria del producto es requerida');  }
  // if (!Array.isArray(producto.fotosecund)) {  throw new Error('La foto secundaria del producto debe ser un arreglo');  }
  // proximamente agregar validaciones de url
}

function validateCategoria(producto) {
  if (!producto.categoria) {  throw new Error('La categoría del producto es requerida');  }
  if (typeof producto.categoria !== 'string') {  throw new Error('La categoría del producto debe ser una cadena de caracteres');  }
  const categoriasPermitidas = ['tecnologia', 'electrodomesticos', 'hogar y muebles', 'herramientas', 'moda', 'juguetes', 'construcion'];
  if (!categoriasPermitidas.includes(producto.categoria.toLowerCase())) {  throw new Error('La categoría del producto no es válida');  }
}


module.exports = {
  validateNombreProducto,
  validateDescProducto,
  validateColorProducto,
  validateFotoPrinc,
  validatePrecioProducto,
  validateDisponibProducto,
  validateFotoSecund,
  validateCategoria,
};
