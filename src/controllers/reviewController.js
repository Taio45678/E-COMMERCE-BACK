const { Producto, Usuario, Review} = require('../db.js');


async function calificarProducto (req, res){
    try{
        const {productoId, usuarioId, description, rating} = req.body;

        const usuario = await Usuario.findByPk(usuarioId);
        const producto = await Producto.findByPk(productoId);
        if(!usuario){
            return res.status(404).json({error: 'Usuario no encontrado'})
        }
        if(!producto){
            return res.status(404).json({error: 'Producto no encontrado'})
        }
        const newReview = await Review.create({
            productoId,
            usuarioId,
            description,
            rating
        })
        res.status(201).json(newReview)
    }catch(err){
        if(err.name === "SequelizeUniqueConstraintError"){
            res.status(400).json({error: "Este usuario ya calificó este producto"})
        }
        else{
        console.error("error al calificar"+err.name)
        res.status(500).json({error: err.name})
        }
    }
}

async function getReviewsUsuario(req, res){
    try{
        const {usuarioId} = req.params
        const reviewsUsuario = await Review.findAll({
            where: {
                usuarioId: usuarioId
            }
        });
      res.status(200).json(reviewsUsuario)  
    }catch(err){
        res.status(500).json({error: err.name})
    }
}

async function getAllReviews(req, res){
    try{
        const allReviews = await Review.findAll()

        res.status(200).json(allReviews)
    }catch(err){
        res.status(500).json({error: err.name})
    }
}

async function actualizarReview(req, res){
    try{
    const {productoId, usuarioId, description, rating} = req.body;

    const review = await Review.findOne({
        where: {
            usuarioId: usuarioId,
            productoId: productoId
        }
    })

    if(!review){
       return  res.status(404).json({error: "Review no encontrada"})
    }
  
    review.description = description;
    review.rating = rating;
    await review.save();

    res.status(200).json(review)
    }catch(err){
        console.log(err.name)
        res.status(500).json({error: "Ocurrio un error al actualizar la reseña"})
    }
}

module.exports = {
    calificarProducto,
    getReviewsUsuario,
    getAllReviews,
    actualizarReview
}