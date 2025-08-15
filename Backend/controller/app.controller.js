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
    const result = await User.getUserTrans(id);
    return res.status(200).json({success : true, data : result });
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

const newOrder = async (req, res) => {
  try {
    const payload = Array.isArray(req.body) ? req.body : [req.body];

    if (!Array.isArray(payload) || payload.length === 0) {
      return res.status(400).json({ message: "Invalid payload: expected a non-empty array" });
    }

    const orders = payload.map((o, index) => {
      const buyer_id = parseInt(o?.buyer_id, 10);
      const seller_id = parseInt(o?.user_id, 10);
      const prod_id = parseInt(o?.prod_id, 10);
      const quantity = parseInt(o?.prod_quantity, 10);
      const description = o?.prod_description;
      const prod_name = o?.prod_name;
      const prod_price = Number(o?.prod_price);
      const final_price = Number(o?.final_price);

      const errors = [];
      if ([buyer_id, seller_id, prod_id, quantity,prod_price,final_price].some(Number.isNaN)) {
        errors.push("buyer_id, seller_id, prod_id, quantity must be numbers");
      }
      if (!Number.isNaN(quantity) && (!Number.isInteger(quantity) || quantity <= 0)) {
        errors.push("quantity must be a positive integer");
      }

      return { index, buyer_id, seller_id, prod_id, quantity, description,prod_name, prod_price, final_price, errors };
    });

    const invalid = orders.filter(o => o.errors.length);
    if (invalid.length) {
      console.log(invalid.forEach(item => console.log(item)))
      return res.status(400).json({
        message: "Invalid parameters in one or more orders",
        invalid: invalid.map(({ index, errors }) => ({ index, errors })),
      });
    }

    const results = [];
    for (const o of orders) {
      try {
        const r = await User.addOrder(
          o.buyer_id,
          o.seller_id,
          o.prod_id,
          o.quantity,        
          o.description,
          o.prod_name,
          o.prod_price,
          o.final_price
        );
        results.push({
          index: o.index,
          success: !!r?.success,
          message: r?.message || (r?.success ? "Created" : "Failed"),
        });
      } catch (e) {
        console.log(e.message)
        results.push({ index: o.index, success: false, message: e?.message || "Unhandled error" });
      }
    }

    const successes = results.filter(r => r.success).length;
    const failures = results.length - successes;

    return res.status(failures ? 207 : 201).json({
      message: failures ? "Partially processed" : "All orders created",
      counts: { total: results.length, successes, failures },
      results,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failure", error: error.message });
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
