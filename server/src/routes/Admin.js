const express = require("express");
const routes = express.Router();
const { registerAdmin, loginAdmin ,getAllUsers} = require("../controllers/Admin");

routes.get("/admin/getAllUsers",getAllUsers);
routes.post("/admin/registerAdmin", registerAdmin);
routes.post("/admin/loginAdmin", loginAdmin);

module.exports = routes;
