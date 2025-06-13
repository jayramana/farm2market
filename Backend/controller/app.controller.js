const User = require("../model/app.model.js");

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

const getParticular = async (req, res) => {
  try {
    const { prod_name } = req.body;

    const [prod] = await User.getParticularProduct(prod_name);

    res.status(200).json({ message: "Success", data: prod });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

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
    res.status(500).json({ message: error });
  }
};

const confirmOrder = async (req, res) => {
  const {
    buyer_id,
    seller_id,
    prod_id,
    quantity,
    final_price,
    transaction_status,
  } = req.body;
  try {
    if (
      !buyer_id ||
      !seller_id ||
      !prod_id ||
      !quantity ||
      !final_price 
    ) {
      return res.status(400).json({ message: "Fill all fields" });
    }
    await User.reduceContents(quantity, prod_id, seller_id);
    const [order] = await User.createTransactons(
      buyer_id,
      seller_id,
      prod_id,
      quantity,
      final_price,
      transaction_status
    );

    res.status(200).json({ message: "Success", data: order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const filterProduct = async (req, res) => {
  try {
    const { user_loc, prod_name, prod_price } = req.body;
    const newPrice = parseFloat(prod_price);
    const [prods] = await User.filterProduct(user_loc, prod_name, newPrice);

    res.status(200).json({ message: "Success", data: prods });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getParticularUOrder = async (user_id) => {
  try {
    const result = await User.getParticularTrans(user_id);
    res.status(200).json({ message: "Success", data: result });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllProducts,
  getParticular,
  addProduct,
  confirmOrder,
  filterProduct,
  getParticularUOrder,
};
