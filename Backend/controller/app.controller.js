const User = require("../model/app.model.js");

//Get All Products in stock
const getAllProducts = async (req, res) => {
  try {
    const fetchData = await User.getAllProducts();
    res
      .status(200)
      .json({ message: "Products Successfully retrieved", data: fetchData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add products to DB(Requires role handling)
const addProduct = async (req, res) => {
  try {
    const {
      user_id,
      prod_name,
      prod_category,
      prod_price,
      prod_quantity,
      prod_description,
    } = req.body;

    if (
      !user_id ||
      !prod_name ||
      !prod_category ||
      !prod_price ||
      !prod_quantity ||
      !prod_description
    ) {
      return res
        .status(400)
        .json({ message: "Fill all the fields before submitting" });
    }

    const addProd = await User.createProduct(
      user_id,
      prod_name,
      prod_category,
      prod_price,
      prod_quantity,
      prod_description
    );

    res.status(200).json({ message: "Success", data: addProd });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

// Get a Particular User's Order
const getUserOrder = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status();
    const [result] = await User.getUserTrans(id);
    return res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

//Get the sales of sellers
const getSellerSales = async (req, res) => {
  try {
    const user_id = parseInt(req.params.id, 10);

    if (Number.isNaN(user_id))
      return res.status(404).json({ message: "User Not Found !" });

    const [fetchData] = await User.getSellerTrans(user_id);

    return res.status(200).json({ success: true, data: fetchData });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};

// Get total selling price of the farmers
const getFarmerstats = async (req, res) => {
  try {
    const _id = parseInt(req.params.id, 10);

    if (Number.isNaN(_id))
      return res.status(404).json({ message: "User Not Found!" });

    const [fetchData] = await User.getFarmerStats(_id);

    return res.status(200).json({ message: "Success", data: fetchData });
  } catch (error) {
    return res.status(500).json({ message: "Failiure", err: error.message });
  }
};

//Get total buying of users
const getNormstats = async (req, res) => {
  try {
    const _id = parseInt(req.params.id, 10);

    if (Number.isNaN(_id))
      return res.status(404).json({ message: "User not Found!!" });

    const fetchData = await User.getNormieStats(_id);

    return res.status(200).json({ message: "Success", data: fetchData });
  } catch (error) {
    return res.status(500).json({ message: "Failiure", err: error.message });
  }
};

//Add an order to the transaction table
const newOrder = async (req, res) => {
  try {
    const buyer_id = parseInt(req.body.buyer_id, 10);
    const seller_id = parseInt(req.body.seller_id, 10);
    const prod_id = parseInt(req.body.prod_id, 10);
    const prod_quantity = parseInt(req.body.prod_quantity, 10);

    if (
      [buyer_id, seller_id, prod_id, prod_quantity].some((n) => Number.isNaN(n))
    ) {
      return res.status(400).json({ message: "Invalid parameters" });
    }

    const fetchData = await User.addOrder(
      buyer_id,
      seller_id,
      prod_id,
      prod_quantity
    );
    if (!fetchData.success)
      return res
        .status(400)
        .json({ message: "Failiure", message: fetchData.message });
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    return res.status(500).json({ message: "Failiure", err: error.message });
  }
};

// Edit Product Details
const editProdstats = async (req, res) => {
  try {
    const user_id = parseInt(req.body.user_id);
    const prod_id = parseInt(req.body.prod_id);
    const prod_price = parseFloat(req.body.prod_price);
    const prod_quantity = parseInt(req.body.prod_quantity);

    await User.editProduct(user_id, prod_id, prod_price, prod_quantity);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Get all Categories

const allCategories = async (req, res) => {
  try {
    const fetchData = (await User.getAllCategories()).map(
      (r) => r.prod_category
    );
    return res.status(200).json({ data: fetchData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get All Farmers
const allSellers = async (req, res) => {
  try {
    const fetchData = (await User.getAllSellers()).map((r) => r.user_name);
    return res.status(200).json({ data: fetchData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get All Locations
const allLocations = async (req, res) => {
  try {
    const fetchData = (await User.getAllLocations()).map((r) => r.user_loc);
    return res.status(200).json({ data: fetchData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Get user Details

const getUserdetails = async (req, res) => {
  try {
    const  id = parseInt(req.params.id,10);
    const fetchData = await User.getUserDetails(id);

    if (fetchData.length === 0)
      return res.status(400).json({ success: false, data: "None Found!!" });
    return res.status(200).json({ success: true, data: fetchData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, data: error });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  getUserOrder,
  getSellerSales,
  getFarmerstats,
  getNormstats,
  newOrder,
  editProdstats,
  allCategories,
  allSellers,
  allLocations,
  getUserdetails
};
