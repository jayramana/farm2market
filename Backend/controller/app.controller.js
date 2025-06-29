const User = require("../model/app.model.js");

//Get All Products in stock
const getAllProducts = async (req, res) => {
  try {
    const [products] = await User.getAllProducts();
    res
      .status(200)
      .json({ message: "Products Successfully retrieved", data: products });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get a Particular item with a searched name
const getParticular = async (req, res) => {
  try {
    const { prod_name } = req.body;

    const [prod] = await User.getParticularProduct(prod_name);

    res.status(200).json({ message: "Success", data: prod });
  } catch (error) {
    res.status(500).json({ err: "Internal Server Error" });
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
    res.status(500).json({ err: error });
  }
};

// Advanced Filtering of Products
const filterProduct = async (req, res) => {
  try {
    const { user_loc, prod_name, prod_price } = req.body;
    const newPrice = parseFloat(prod_price);
    const [prods] = await User.filterProduct(user_loc, prod_name, newPrice);

    res.status(200).json({ message: "Success", data: prods });
  } catch (error) {
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

const searchProduct = async (req, res) => {
  try {
    const { prod_name } = req.body;

    if (!prod_name) {
      return res.status(400).json({ message: "Fill the name of the product" });
    }

    const [ans] = await User.searchProduct(prod_name);

    res.status(200).json({ message: "Success", data: ans });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: "Internal Server Error" });
  }
};

// Get a Particular User's Order
const getUserOrder = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status();
    const [result] = await User.getUserTrans(id);
    console.log(result);
    return res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

//Get the sales of sellers
const getSellerSales = async (req, res) => {
  try {
    const user_id = parseInt(req.params.id, 10);

    if (Number.isNaN(user_id))
      return res.status(404).json({ message: "User Not Found !" });

    const [result] = await User.getSellerTrans(user_id);

    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    return res.status(500).json({ err: error });
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
    return res.status(500).json({ message: "Failiure", err: error });
  }
};

//Get total buying of users
const getNormstats = async (req, res) => {
  try {
    const _id = parseInt(req.params.id, 10);

    if (Number.isNaN(_id))
      return res.status(404).json({ message: "User not Found!!" });

    const [fetchData] = await User.getNormieStats(_id);

    return res.status(200).json({ message: "Success", data: fetchData });
  } catch (error) {
    return res.status(500).json({ message: "Failiure", err: error });
  }
};

//Add an order to the transaction table
const newOrder = async (req, res) => {
  try {
    const buyer_id = parseInt(req.body.buyer_id, 10);
    const seller_id = parseInt(req.body.seller_id, 10);
    const prod_id = parseInt(req.body.prod_id, 10);
    const prod_quantity = parseInt(req.body.prod_quantity, 10);

    if ([buyer_id, seller_id, prod_id, prod_quantity].some((n) => Number.isNaN(n))) {
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

module.exports = {
  getAllProducts,
  getParticular,
  searchProduct,
  addProduct,
  filterProduct,
  getUserOrder,
  getSellerSales,
  getFarmerstats,
  getNormstats,
  newOrder
};
