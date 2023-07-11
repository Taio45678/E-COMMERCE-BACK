const {Oc , Detalleoc}  = require('../db');

const paginadoOc = async (req, res) => {
  const { page, limit } = req.query;

  try {
    // Convertir los valores de página y límite en números enteros
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Calcular el índice de inicio y fin de las OCs paginadas
    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = pageNumber * limitNumber;

    // Obtener todas las OCs con sus detalles
    const ocs = await Oc.findAll({
      offset: startIndex,
      limit: limitNumber,
      include: [Detalleoc] // Asegúrate de incluir el modelo Detalleoc correctamente
    });

    const totalOCs = await Oc.count();

    // Crear objeto de respuesta con los datos paginados
    const respuesta = {
      totalOCs,
      paginaActual: pageNumber,
      ocs: ocs.slice(startIndex, endIndex)
    };

    return res.status(200).send(respuesta);
  } catch (error) {
    console.log(error)
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
  
      return res.status(200).send(oc.Detalleocs);
    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: 'Error en consulta' });
    }
  };
module.exports = { paginadoOc , ocDetalleLog};
