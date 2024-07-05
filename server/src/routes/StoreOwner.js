const express = require("express");
const routes = express.Router();
const {
    registerStoreOwner, loginStoreOwner, changePassword, calculateTotalStores, getAllStores
} = require("../controllers/StoreOwner");

routes.get("/storeOwner/getAllStores",getAllStores);
routes.post("/storeOwner/registerStoreOwner", registerStoreOwner);
routes.post("/storeOwner/loginStoreOwner", loginStoreOwner);
routes.patch("/storeOwner/changePassword/:id",changePassword);
routes.get("/storeOwner/calculateTotalStores",calculateTotalStores)

module.exports = routes;
