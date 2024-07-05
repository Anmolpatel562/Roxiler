const express = require('express');
const routes = express();
const  { getRatingSubmittedUsers, submitRating, updateSubmittedRating } = require('../controllers/Rating'); 

routes.post('/rating/submitRating/:userId/:storeId',submitRating);
routes.get('/rating/getRatingSubmittedUsers/:storeId',getRatingSubmittedUsers);
routes.patch('/rating/updateSubmittedRating/:ratingId',updateSubmittedRating);

module.exports = routes;