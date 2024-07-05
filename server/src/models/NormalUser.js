const mongoose = require("mongoose");

const normalUserSchema = mongoose.Schema(
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
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
  },
  { timeStamps: true }
);

const NormalUser = mongoose.model("NormalUser", normalUserSchema);

module.exports = NormalUser;
