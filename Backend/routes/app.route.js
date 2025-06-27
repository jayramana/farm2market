const express = require("express");

const router = express.Router();

const { getAllProducts, getParticular, addProduct, filterProduct, getUserOrder,searchProduct,getSellerSales,getFarmerstats,getNormstats,newOrder } = require("../controller/app.controller.js");


router.get("/product/user/orders/:id", getUserOrder);
router.get("/product/user/orderStats/:id", getNormstats); //Ok
router.get("/product/seller/sales/:id", getSellerSales);
router.get("/product/seller/sellStats/:id", getFarmerstats); //Ok

router.post("/product/newOrder", newOrder); //Ok


router.get("/product/getAll", getAllProducts);
router.get("/product/filterbyname", getParticular);
router.get("/product/filterby", filterProduct);

router.post("/product/add", addProduct);
router.get("/product/search", searchProduct);





module.exports = router;