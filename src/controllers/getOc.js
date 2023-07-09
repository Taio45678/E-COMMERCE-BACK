const { Oc, Detalleoc } = require('../db');

const getOCyDetalle = async (req, res) => {
  try {
    // Obtener todas las OCs con sus detalles
    const ocs = await Oc.findAll({
      include: [Detalleoc]
    });

    return res.status(200).send(ocs);
  } catch (error) {
    return res.status(500).send({ error: 'Error en consulta' });
  }
};
const getDetallesPorLoginOC = async (req, res) => {
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
      return res.status(500).send({ error: 'Error en consulta' });
    }
  };
module.exports = { getOCyDetalle , getDetallesPorLoginOC};
