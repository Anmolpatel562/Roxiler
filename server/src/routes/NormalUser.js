const express = require("express");
const routes = express.Router();
const {
  createNormalUser,
  loginNormalUser,
  changePassword,
  totalUser,
  calculateUsersSubmittedRating,
  getAllNormalUsers
} = require("../controllers/NormalUser");

routes.get("/normalUser/getAllNormalUsers",getAllNormalUsers);
routes.get("/normalUser/totalUser",totalUser)
routes.post("/normalUser/createNormalUser", createNormalUser);
routes.post("/normalUser/loginNormalUser", loginNormalUser);
routes.patch("/normalUser/changePassword/:id",changePassword);
routes.get("/normalUser/calculateUsersSubmittedRating",calculateUsersSubmittedRating);

module.exports = routes;
