const StoreOwner = require('../models/StoreOwner');
const bcrypt = require('bcrypt');

const registerStoreOwner = async (req, res) => {
    try {
      const { name, email, password, address, role } = req.body;
      if (!name || !email || !password || !address || !role) {
        return res.status(400).json({
          message: "Incomplete Credentials",
        });
      }
      const user = await StoreOwner.findOne({ email });
      if (user) {
        return res.status(400).json({
          message: "User with this email already registered",
        });
      }
      const encryptedPassword = await bcrypt.hash(password, 10);
      await StoreOwner.create({
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
  
  const loginStoreOwner = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
      const user = await StoreOwner.findOne({ email });
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
      const user = await StoreOwner.findById(id);
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
      await StoreOwner.findByIdAndUpdate(id,{password:encryptedPassword});
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

  const calculateTotalStores = async (req,res) => {
    try{
      const totalStores = await StoreOwner.countDocuments();
      res.status(200).json({
        message:"Total Stores fetched",
        totalStores,
      })
    }catch(error){
      console.log(error);
      res.status(500).json({
        message:"Something went wrong",
      })
    }
  }

const getAllStores = async (req,res) =>{
   try{
    const response = await StoreOwner.find();
    res.status(200).json({
      message:"Fetched All Stores",
      response,
    })
   }catch(error){
    console.log(error);
    res.status(500).json({
      message:"Something went wrong",
    })
   }
}
  
  module.exports = { registerStoreOwner, loginStoreOwner, changePassword, calculateTotalStores, getAllStores };
  