const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");

const getAllUsers = async (req,res) => {
  try{
   const adminUsers = await Admin.find();
   res.status(200).json({
    message:"User fetched Successfully",
    adminUsers
   })
  }catch(error){
    console.log(error);
    res.status(500).json({
      message:"Something went wrong",
    })
  }
}

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({
        message: "Incomplete Credentials",
      });
    }
    const user = await Admin.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User with this email already registered",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      name,
      email,
      password: encryptedPassword,
      address,
      role,
    });
    res.status(200).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
    res.status(200).json({
      message: "User Logged In Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

module.exports = { registerAdmin, loginAdmin, getAllUsers };
