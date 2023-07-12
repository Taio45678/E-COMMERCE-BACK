const { Oc, Detalleoc } = require('../db');

const paginadoOc = async (req, res) => {
  const { page, limit } = req.query;

  try {
    // Convertir los valores de página y límite en números enteros
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calcular el offset para la consulta
    const offset = (pageNumber - 1) * limitNumber;

    // Obtener todas las OCs con estadooc "aprobado" y sus detalles y el número total de OCs
    const { count, rows } = await Oc.findAndCountAll({
      offset,
      limit: limitNumber,
      include: [Detalleoc], // Asegúrate de incluir el modelo Detalleoc correctamente
      where: {
        estadooc: 'Exitoso'
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



const ocDetalleLog = async (req, res) => {
    const { loginuser } = req.params;
  
    try {
      // Buscar la OC por login de usuario
      const oc = await Oc.findOne({
        where: {
          loginuser: loginuser
        },
        include: [Detalleoc]
      });
  
      if (!oc) {
        return res.status(404).send({ error: 'OC no encontrada' });
      }
  
      return res.status(200).send(oc);
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Error en consulta' });
    }
  };
module.exports = { paginadoOc , ocDetalleLog};
