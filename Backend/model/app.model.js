const db = require("../config/db.js");

const createUser = (
  user_name,
  user_email,
  user_enpass,
  user_role,
  user_phone,
  user_loc
) =>
  db.query(
    "INSERT INTO USERS(user_name,user_email,user_enpass,user_role,user_phone,user_loc)VALUES(?,?,?,?,?,?)",
    [user_name, user_email, user_enpass, user_role, user_phone, user_loc]
  );
const getAllUsers = () => db.query("SELECT * FROM USERS");
const getAllUserOrder = (user_id) =>
  db.query("SELECT * FROM TRANSACTIONS WHERE buyer_id = ? ", [user_id]);

const createProduct = async (user_id, prod_name, prod_category, prod_price, prod_quantity, prod_description) => {
  try {
    const [rows] = await db.query("SELECT user_role FROM users WHERE user_id = ?", [user_id]);

    if (rows.length === 0) {
      throw new Error("User not found.");
    }

    const role = rows[0].user_role;

    if (role === 'farmer') {
      await db.query(
        "INSERT INTO PRODUCT (user_id,prod_name, prod_category, prod_price, prod_quantity, prod_description) VALUES (?, ?, ?, ?, ?, ?);",
        [user_id, prod_name, prod_category, prod_price, prod_quantity, prod_description]
      );
      console.log("Product created successfully.");
    } else {
      throw new Error("Unauthorized: Only farmers can create products.");
    }

  } catch (err) {
    console.error(err);
    throw err;
  }
}
  
const getAllProducts = () => db.query("SELECT * FROM PRODUCT");
const getParticularProduct = (prod_name) =>
  db.query("Select * FROM PRODUCT WHERE prod_name = ? ", [prod_name]);
const filterProduct = (user_loc, prod_name, prod_price) =>
  db.query(
    `SELECT u.user_loc,p.prod_name,p.prod_price
from product p
inner join Users u
on u.user_id = p.user_id
Where u.user_loc = ? 
AND p.prod_name = ?
AND p.prod_price <= ?;`,
    [user_loc, prod_name, prod_price]
  );
const searchProduct = (prod_name) =>
  db.query(
    "SELECT p.user_id,u.user_name,p.prod_name,p.prod_price,p.prod_category,p.prod_quantity from product p inner join users u on p.user_id = u.user_id where p.prod_name = ? ",
    [prod_name]
  );

const getUserTrans = (user_id) =>
  db.query("SELECT * FROM TRANSACTIONS WHERE buyer_id = ?", [user_id]);

const getSellerTrans = (user_id) =>
  db.query(
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

const getParticularSTrans = (user_id) =>
  db.query(
    `
    SELECT p.prod_name,t.quantity,t.final_price,t.transaction_status,t.transaction_date from transactions t
    INNER JOIN product p
    on p.prod_id = t.prod_id
    where t.seller_id = ?
    `,
    [user_id]
  );

const getFarmerStats = (user_id) =>
  db.query(
    `SELECT u.user_name,u.user_role,SUM(t.quantity) AS tot_quantity,SUM(t.final_price) AS tot_price
FROM TRANSACTIONS t
INNER JOIN users u
on  t.seller_id = u.user_id WHERE u.user_id = ?  AND u.user_role = 'farmer'
GROUP BY u.user_name,u.user_role;`,
    [user_id]
  );

const getNormieStats = (user_id) =>
  db.query(
    `SELECT u.user_name,u.user_role,SUM(t.quantity) AS tot_quantity, SUM(t.final_price) AS final_price
FROM transactions t
INNER JOIN users u
ON u.user_id = t.buyer_id
WHERE u.user_role = 'consumer' AND u.user_id = ?
GROUP BY u.user_name,u.user_role;`,
    [user_id]
  );

const addOrder = async (buy_id, sell_id, pid, quantity) => {
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
};

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
};
