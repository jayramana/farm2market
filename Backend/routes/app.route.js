const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  getParticular,
  addProduct,
  filterProduct,
  getUserOrder,
  searchProduct,
  getSellerSales,
  getFarmerstats,
  getNormstats,
  newOrder,
  editProdstats,
  allCategories,
  allLocations,
allSellers
} = require("../controller/app.controller.js");

// Check the app.model.js before finalizing the project

router.get("/health", (req, res) => {
  res.send("Backend is running!");
});

router.get("/product/allCategories", allCategories); //Ok
router.get("/product/allSellers", allSellers); //Ok
router.get("/product/allLocations", allLocations); //Ok

router.get("/product/user/orderStats/:id", getNormstats); //Ok
router.get("/product/seller/sales/:id", getSellerSales);
router.get("/product/seller/sellStats/:id", getFarmerstats); //Ok

router.get("/product/getAll", getAllProducts); //Ok
router.get("/product/filterbyname", getParticular);
router.get("/product/filterby", filterProduct);
router.get("/product/search", searchProduct);

router.get("/product/user/orders/:id", getUserOrder); //Ok

router.post("/product/add", addProduct); //Ok
router.put("/product/edit",editProdstats) // Ok

router.post("/product/newOrder", newOrder); //Ok

module.exports = router;
