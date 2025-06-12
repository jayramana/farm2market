const User = require("../model/app.model.js")
const bcrypt = require("bcryptjs");

const createAccount = async (req, res) => {
    try {
        const { user_name, user_email, user_enpass, user_role, user_phone, user_loc } = req.body;
        if (!user_name || !user_email || !user_enpass || !user_role || !user_phone || !user_loc) {
            return res.status(400).json("Enter all the details");
        }
        const hashPass = await bcrypt.hash(user_enpass, 10);
    

        await User.createUser(user_name, user_email, hashPass, user_role, user_phone, user_loc);
        
        res.status(200).json({message : "Account added Successfully"})
        
    } catch (error) {
        return res.status(500).json(error)
    }
}

