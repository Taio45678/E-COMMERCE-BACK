const { Router } = require('express');
const userRouter = require("./userRouter")
const productsRouter = require("./productsRouter")
const router = Router();

router.use("/user", userRouter);
router.use("/productos", productsRouter);

module.exports = router ;