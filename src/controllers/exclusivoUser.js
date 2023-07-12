const { Oc, Detalleoc } = require('../db');

const paginadoUserOc = async (req, res) => {
  const { page, limit } = req.query;

  try {
    // Convertir los valores de página y límite en números enteros
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calcular el offset para la consulta
    const offset = (pageNumber - 1) * limitNumber;

    // Obtener todas las OCs con estadooc "aprobado" o "fallido" y sus detalles y el número total de OCs
    const { count, rows } = await Oc.findAndCountAll({
      offset,
      limit: limitNumber,
      include: [Detalleoc], // Asegúrate de incluir el modelo Detalleoc correctamente
      where: {
        estadooc: ['aprobado', 'fallido']
      }
    });

    // Crear objeto de respuesta con los datos paginados
    const respuesta = {
      totalOCs: count,
      paginaActual: pageNumber,
      ocs: rows
    };

    return res.status(200).send(respuesta);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: 'Error en consulta' });
  }
};
module.exports = { paginadoUserOc };