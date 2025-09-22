const express = require("express");

const router = express.Router();

const {
  getAllProducts,
  addProduct,
  getUserOrder,
  getSellerSales,
  getFarmerstats,
  getNormstats,
  newOrder,
  editProdstats,
  allCategories,
  allLocations,
  allSellers,
  getUserdetails,
  checkUser,
  create_User
} = require("../controller/app.controller.js");

// Check the app.model.js before finalizing the project

router.get("/health", (req, res) => {
  res.send("Backend is running!");
});

router.post("/user/check", checkUser); //Ok
router.post("/user/create",create_User) // Ok

router.get("/product/allCategories", allCategories); //Ok
router.get("/product/allSellers", allSellers); //Ok
router.get("/product/allLocations", allLocations); //Ok

router.get("/product/user/orderStats/:id", getNormstats); //Ok
router.get("/product/seller/sales/:id", getSellerSales);
router.get("/product/seller/sellStats/:id", getFarmerstats); //Ok

router.get("/product/getAll", getAllProducts); //Ok

router.get("/product/user/orders/:id", getUserOrder); //Ok
router.get("/product/users/details/:id", getUserdetails);

router.post("/product/add", addProduct); //Ok
router.put("/product/edit",editProdstats) // Ok

router.post("/product/newOrder", newOrder); //Ok

module.exports = router;
