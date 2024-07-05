const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "NormalUser", "StoreOwner"],
      required: true,
    },
  },
  { timeStamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
