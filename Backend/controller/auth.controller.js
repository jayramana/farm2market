const User = require("../model/app.model.js");
const bcrypt = require("bcrypt");

const create_User = async (req, res) => {
  try {
    const {
      user_name,
      user_email,
      user_enpass,
      user_role,
      user_phone,
      user_loc,
    } = req.body;
    const hashPass = await bcrypt.hash(user_enpass, 10);

    const insertData = await User.createUser(
      user_name,
      user_email,
      hashPass,
      user_role,
      user_phone,
      user_loc
    );
    return res.status(200).json({ success: true, data: insertData.insertId });
  } catch (error) {
    return res.status(500).json({ success: false, data: error.message });
  }
};

const checkUser = async (req, res) => {
  try {
    const name = req.body.user_name;
    const email = req.body.user_email;
    const pass = req.body.user_enpass;

    const [fetchData] = await User.checkUserExists(name, email);
    if (fetchData.length === 0)
          return res.status(400).json({ success: false, message: "None Found!!" });
      
    

    const compare = await bcrypt.compare(pass, fetchData.user_enpass);

    if (!compare) {
      return res.status(401).json({success : false, message : "Wrong Credentials"})
    }

    return res.status(200).json({ success: true, data: fetchData });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


module.exports = { create_User, checkUser };