const generateToken = require("../config/utils.js");
const Auth = require("../model/auth.model.js");
const bcrypt = require("bcryptjs");

const createAccount = async (req, res) => {
  try {
    const {
      user_name,
      user_email,
      user_enpass,
      user_role,
      user_phone,
      user_loc,
    } = req.body;

    if (
      !user_name ||
      !user_email ||
      !user_enpass ||
      !user_role ||
      !user_phone ||
      !user_loc
    ) {
      return res.status(400).json({ message: "Enter all the details" });
    }

    const [check] = await Auth.findOne(user_name, user_email);
    if (check.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(user_enpass, salt);

    await Auth.createUser(
      user_name,
      user_email,
      hashedPass,
      user_role,
      user_phone,
      user_loc
    );

    const [getAgain] = await Auth.findOne(user_email);
    const user = getAgain[0];

    const token = generateToken(user.user_id,res);

    res.status(200).json({ message: "Account added successfully", token });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const signIn = async (req, res) => {
  try {
    const { user_email, user_enpass } = req.body;

    if (!user_email || !user_enpass) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const [user] = await Auth.findOne(user_email); 

    if (!user || user.length === 0) {
      return res.status(400).json({ message: "The combination is wrong, try again!" });
    }

    const foundUser = user[0];

    const isPass = await bcrypt.compare(user_enpass, foundUser.user_enpass);
    if (!isPass) {
      return res.status(400).json({ message: "Incorrect password, try again later." });
    }

    const token = generateToken(foundUser.user_id,res);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        user_id: foundUser.user_id,
        user_name: foundUser.user_name,
        user_email: foundUser.user_email,
        user_role: foundUser.user_role,
        user_phone: foundUser.user_phone,
        user_loc: foundUser.user_loc
      }
    });

  } catch (err) {
    console.error("SignIn error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const LogOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
};


module.exports = { createAccount,signIn,LogOut};
