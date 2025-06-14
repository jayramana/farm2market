const db = require("../config/db.js");

const findOne = (user_email) => db.query(`
     SELECT user_name,user_email,user_loc from users where user_email = ? LIMIT 1
`, [user_email])

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

module.exports = {findOne,createUser} 