const db = require("../config/db.js");

const createUser = async (
  user_name,
  user_email,
  user_enpass,
  user_role,
  user_phone,
  user_loc
) => {
  const [rows] = await db.query(
    "INSERT INTO USERS(user_name,user_email,user_enpass,user_role,user_phone,user_loc)VALUES(?,?,?,?,?,?)",
    [user_name, user_email, user_enpass, user_role, user_phone, user_loc]
  );
  if (rows.affectedRows == 0)
    throw new Error("Error occured while creating a user!");
  return { success: true };
};
const getAllUsers = async () => {
  const [rows] = await db.query("SELECT * FROM USERS");
  if (rows.length == 0) throw new Error("No data Found!");
  return { success: true };
};
const getAllUserOrder = async (user_id) => {
  const [rows] = await db.query(
    "SELECT * FROM TRANSACTIONS WHERE buyer_id = ? ",
    [user_id]
  );
  if (rows.length == 0) throw new Error("Orders are Empty!");
};

const createProduct = async (
  user_id,
  prod_name,
  prod_category,
  prod_price,
  prod_quantity,
  prod_description
) => {
  try {
    const [rows] = await db.query(
      "SELECT user_role FROM users WHERE user_id = ?",
      [user_id]
    );

    if (rows.length === 0) {
      throw new Error("User not found.");
    }

    const role = rows[0].user_role;
    const [prev_check] = await db.query(
      "SELECT * from PRODUCT WHERE prod_name = ? AND user_id = ?",
      [prod_name, user_id]
    );

    if (role === "farmer") {
      if (prev_check.length == 0) {
        await db.query(
          "INSERT INTO PRODUCT (user_id,prod_name, prod_category, prod_price, prod_quantity, prod_description) VALUES (?, ?, ?, ?, ?, ?);",
          [
            user_id,
            prod_name,
            prod_category,
            prod_price,
            prod_quantity,
            prod_description,
          ]
        );
        console.log("Product created successfully.");
      } else {
        await db.query(
          "UPDATE PRODUCT SET prod_quantity = ?, prod_price = ?, prod_description = ? WHERE user_id = ? AND prod_name = ?",
          [
            prev_check[0].prod_quantity + prod_quantity,
            prod_price,
            prod_description,
            user_id,
            prod_name,
          ]
        );
      }
    } else {
      throw new Error("Unauthorized: Only farmers can create products.");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getAllProducts = async () => {
  const [rows] = await db.query("SELECT * FROM PRODUCT");
  if (rows.length == 0) throw new Error("No Products Found!");

  return rows;
};
const getParticularProduct = async (prod_name) => {
  const [rows] = await db.query("Select * FROM PRODUCT WHERE prod_name = ? ", [
    prod_name,
  ]);
  if (rows.length == 0) throw new Error("Product not found!!");
  return { success: true, data: rows };
};
const filterProduct = async (user_loc, prod_name, prod_price) => {
  const [rows] = await db.query(
    `SELECT u.user_loc,p.prod_name,p.prod_price
from product p
inner join Users u
on u.user_id = p.user_id
Where u.user_loc = ? 
AND p.prod_name = ?
AND p.prod_price <= ?;`,
    [user_loc, prod_name, prod_price]
  );
  if (rows.length == 0) throw new Error("Products not Found!!");
  return { success: true, data: rows };
};

//Why ??
const searchProduct = async (prod_name) => {
  try {
    const [rows] = db.query(
      "SELECT p.user_id,u.user_name,p.prod_name,p.prod_price,p.prod_category,p.prod_quantity from product p inner join users u on p.user_id = u.user_id where p.prod_name = ? ",
      [prod_name]
    );

    if (rows.length == 0) throw new Error("Product not found !");
    return { success: true, data: rows[0] };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const getUserTrans = async (user_id) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM TRANSACTIONS WHERE buyer_id = ?",
      [user_id]
    );
    if (rows.length == 0) throw new Error("No transactions Found !! ");
    return { success: true, data: rows };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const getSellerTrans = async (user_id) => {
  try {
    const [rows] = await db.query(
      `SELECT
         p.prod_id,
         p.prod_name,
         t.quantity,
         t.final_price
       FROM Transactions t
       INNER JOIN Product p
         ON t.prod_id = p.prod_id
       WHERE t.seller_id = ?`,
      [user_id]
    );
    if (rows.length == 0) throw new Error("No Transactions Found !! ");
    return { success: true, data: rows[0] };
  } catch {
    err;
  }
  {
    return { success: false, message: err.message };
  }
};

const getParticularSTrans = async (user_id) => {
  try {
    const [rows] = await db.query(
      `
      SELECT p.prod_name,t.quantity,t.final_price,t.transaction_status,t.transaction_date from transactions t
      INNER JOIN product p
      on p.prod_id = t.prod_id
      where t.seller_id = ?
      `,
      [user_id]
    );

    if (rows.length === 0) throw new Error("No Trabsactions Found !!");
    return { success: true, data: rows[0] };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const getFarmerStats = async (user_id) => {
  try {
    const [rows] = await db.query(
      `SELECT u.user_name,u.user_role,SUM(t.quantity) AS tot_quantity,SUM(t.final_price) AS tot_price
  FROM TRANSACTIONS t
  INNER JOIN users u
  on  t.seller_id = u.user_id WHERE u.user_id = ?  AND u.user_role = 'farmer'
  GROUP BY u.user_name,u.user_role;`,
      [user_id]
    );
    if (rows.length === 0) throw new Error("No Data Found !!");
    return { success: true, data: rows[0] };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

const getNormieStats = async (user_id) => {
  try {
    const [rows] = await db.query(
      `SELECT u.user_name,u.user_role,SUM(t.quantity) AS tot_quantity, SUM(t.final_price) AS final_price
  FROM transactions t
  INNER JOIN users u
  ON u.user_id = t.buyer_id
  WHERE u.user_role = 'consumer' AND u.user_id = ?
  GROUP BY u.user_name,u.user_role;`,
      [user_id]
    );
    if (rows.length === 0) throw new Error("No User Found !!");
    return { success: true, data: rows[0] };
  } catch (err) {
    return { success: false, message: err.message };
  }
};
const addOrder = async (buy_id, sell_id, pid, quantity) => {
  try {
    const [rows] = await db.query(
      "SELECT prod_quantity from product where prod_id = ?",
      [pid]
    );

    const [rows1] = await db.query(
      "SELECT prod_price from product where prod_id = ? ",
      [pid]
    );

    const curr_quantity = rows[0]?.prod_quantity || 0;
    const curr_price = rows1[0]?.prod_price || 0.0;
    if (curr_quantity < quantity) {
      return { success: false, message: "Insufficient stock" };
    }
    if (curr_quantity >= quantity) {
      await db.query(
        "INSERT INTO transactions(buyer_id,seller_id,prod_id,quantity,prod_price,final_price)VALUES(?,?,?,?,?,?)",
        [buy_id, sell_id, pid, quantity, curr_price, quantity * curr_price]
      );

      await db.query(
        `UPDATE product set prod_quantity = prod_quantity - ? where prod_id = ?`,
        [quantity, pid]
      );
    }
    return { success: true };
  } catch (err) {
    return { success: false };
  }
};

//Edit Product quantity & product price
const editProduct = async (user_id, prod_id, prod_price, prod_quantity) => {
  const [rows] = await db.query(
    "SELECT user_role FROM users WHERE user_id = ?",
    [user_id]
  );

  if (rows.length === 0) {
    throw new Error("User not found");
  }

  const role = rows[0].user_role;

  if (role === "farmer") {
    const [result] = await db.query(
      "UPDATE product SET prod_price = ?, prod_quantity = ? WHERE prod_id = ? AND user_id = ?",
      [prod_price, prod_quantity, prod_id, user_id]
    );

    if (result.affectedRows === 0) {
      throw new Error(
        "Product not found or you do not have permission to edit this product"
      );
    }

    const [updatedProductRows] = await db.query(
      "SELECT * FROM product WHERE prod_id = ? AND user_id = ?",
      [prod_id, user_id]
    );

    return updatedProductRows[0];
  } else {
    throw new Error("Unauthorized!!");
  }
};

// Get all prod_categories

const getAllCategories = async () => {
  try {
    const [rows] = await db.query("SELECT DISTINCT prod_category from product");
    if (rows.length === 0) throw new Error("No categories Found!!");
    return rows;
  } catch (err) {
    return { success: false, message: err.message };
  }
};

// Get All Sellers
const getAllSellers = async () => {
  try {
    const [rows] = await db.query(
      "SELECT DISTINCT user_name from users where user_role = 'farmer' "
    );
    if (rows.length === 0) throw new Error("No Sellers Found");
    return rows;
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Get all locations
const getAllLocations = async () => {
  try {
    const [rows] = await db.query("SELECT DISTINCT user_loc from users");
    if (rows.length === 0) throw new Error('No Locations found');
    return rows;
  } catch (error) {
    return { success: false, message: error.message };
    
  }
}

module.exports = {
  createUser,
  createProduct,
  getAllUsers,
  searchProduct,
  getAllUserOrder,
  getAllProducts,
  getParticularProduct,
  filterProduct,
  getUserTrans,
  getSellerTrans,
  getParticularSTrans,
  getFarmerStats,
  getNormieStats,
  addOrder,
  editProduct,
  getAllCategories,
  getAllSellers,
  getAllLocations
};
