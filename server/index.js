const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const adminRoutes = require("./src/routes/Admin");
const normalUserRoutes = require("./src/routes/NormalUser");
const storeOwner = require("./src/routes/StoreOwner");
const ratingRoutes = require("./src/routes/Rating");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());

app.use(adminRoutes);
app.use(normalUserRoutes);
app.use(storeOwner);
app.use(ratingRoutes);

app.get("/", (req, res) => {
  res.send("Hey Developer");
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  mongoose
    .connect(process.env.MONGODBURL)
    .then(() => {
      console.log("DataBase Connected Successfully, Server is Up");
    })
    .catch((error) => {
      console.log(error);
    });
});
