const express = require("express");

const router = express.Router();

const { getAllProducts, getParticular, addProduct, filterProduct,confirmOrder, getParticularUOrder } = require("../controller/app.controller.js");


router.get("/product/user/orders/:id", getParticularUOrder);



router.get("/product/getAll", getAllProducts);
router.get("/product/filterbyname", getParticular);
router.get("/product/filterby", filterProduct);

router.post("/product/add", addProduct);

router.post("/product/order", confirmOrder);


module.exports = router;