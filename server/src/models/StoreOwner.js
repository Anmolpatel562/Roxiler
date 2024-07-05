const mongoose = require("mongoose");

const storeOwnerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
});

const StoreOwner = mongoose.model("storeOwner", storeOwnerSchema);

module.exports = StoreOwner;
