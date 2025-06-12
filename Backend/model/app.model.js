const db = require("../config/db.js");

const createUser = (user_name,user_email,user_enpass,user_role,user_phone,user_loc) => db.query("INSERT INTO USERS(user_name,user_email,user_enpass,user_role,user_phone,user_loc)VALUES(?,?,?,?,?,?)",[user_name,user_email,user_enpass,user_role,user_phone,user_loc])
const getAllUsers = () => db.query("SELECT * FROM USERS");
const getAllUserOrder = (user_id) => db.query("SELECT * FROM TRANSACTIONS WHERE buyer_id = ? ", [user_id]);


const createProduct = (user_id, prod_name, prod_price, prod_quantity, prod_description) => db.query("INSERT INTO PRODUCT(user_id,prod_name,prod_price,prod_quantity,prod_description)VALUES(?,?,?,?,?)", [user_id, prod_name, prod_price, prod_quantity, prod_description])
const getAllProducts = () => db.query("SELECT * FROM PRODUCT");
const getParticularProduct = (prod_name) => db.query("Select * FROM PRODUCT WHERE prod_name = ? ", [prod_name]);
const filterProduct = (user_loc, prod_name, prod_price) => db.query(
    `SELECT u.user_id, u.user_name, u.user_loc, p.prod_id, p.prod_name, p.prod_price, p.prod_quantity FROM USERS u
 INNER JOIN PRODUCT p ON u.user_id = p.user_id
 WHERE (? IS NULL OR u.user_loc = ?) AND (? IS NULL OR p.prod_name = ?) AND (? IS NULL OR p.prod_price <= ?);`
, [user_loc, user_loc, prod_name, prod_name, prod_price, prod_price])
const reduceContents = (quantity, p_id, u_id) => db.query("UPDATE PRODUCT SET prod_quantity = prod_quantity - ? WHERE prod_id = ? AND user_id = ? AND prod_quantity >= ?", [quantity, p_id, u_id, quantity]);


const createTransactons = (buyer_id, seller_id, prod_id, quantity, final_price, transaction_status) => db.query("INSERT INTO TRANSACTIONS(buyer_id,seller_id,prod_id,quantity,final_price,transaction_status) VALUES(?, ?, ?, ?, ?, ?)", [buyer_id, seller_id, prod_id, quantity, final_price, transaction_status])
const getParticularTrans = (user_id) => db.query("SELECT * FROM TRANSACTIONS WHERE buyer_id = ?", [user_id]);
const getParticularSTrans = (user_id) => db.query
    (
    `
    SELECT p.prod_name,t.quantity,t.final_price,t.transaction_status,t.transaction_date from transactions t
    INNER JOIN product p
    on p.prod_id = t.prod_id
    where t.seller_id = ?
    `
    ,[user_id]);


module.exports = { createUser, createProduct, getAllUsers, getAllUserOrder,getAllProducts,getParticularProduct,createTransactons,filterProduct,reduceContents,getParticularTrans,getParticularSTrans };

