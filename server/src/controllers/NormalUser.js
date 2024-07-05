const NormalUser = require("../models/NormalUser");
const Admin = require("../models/Admin")
const bcrypt = require("bcrypt");

const createNormalUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;
    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({
        message: "Incomplete Credentials",
      });
    }
    const user = await NormalUser.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User with this email already registered",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await NormalUser.create({
      name,
      email,
      password: encryptedPassword,
      address,
      role,
    });
    res.status(200).json({
      message: "User Registered Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

const loginNormalUser = async (req, res) => {
  try {

    const { email, password } = req.body;
    console.log(email);
    console.log(password)
    if (!email || !password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const user = await NormalUser.findOne({ email });
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

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, newPassword } = req.body;
    if (!password || !newPassword) {
      return res.status(400).json({
        message: "Incomplete Credentials",
      });
    }
    const user = await NormalUser.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "Invalid Email",
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Old Password Incorrect",
      });
    }
    const encryptedPassword = await bcrypt.hash(newPassword,10);
    await NormalUser.findByIdAndUpdate(id,{password:encryptedPassword});
    res.status(200).json({
      message: "Password Changed.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
        message:"Something went wrong",
    })
  }
};

const totalUser = async (req,res) => {
  try{ 
    const normalUsers = await NormalUser.countDocuments();
    const adminUsers = await Admin.countDocuments();
    const totalUser = normalUsers + adminUsers;
    res.status(200).json({
      message:"Total Users fetched",
      totalUser,
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      message:"Something went wrong",
    })
  }
}

const calculateUsersSubmittedRating = async (req,res) => {
  try{
    const usersWithRatings = await NormalUser.find({ ratings: { $exists: true, $ne: [] } });
    res.status(200).json({
      message:"fetched Successfully",
      usersWithRatings
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      message:"Something went wrong",
    })
  }
}

const getAllNormalUsers = async (req,res) => {
  try{
   const normalUser = await NormalUser.find();
   res.status(200).json({
    message:"NormalUser Fetched.",
    normalUser,
   })
  }catch(error){
    console.log(error);
    res.status(500).json({
      message:"Something went wrong"
    })
  }
}

module.exports = { createNormalUser, loginNormalUser, changePassword, totalUser, calculateUsersSubmittedRating, getAllNormalUsers };
