const express = require("express");
const { searchProducts } = require("../../controllers/customer/search-controller");



const router = express.Router();


router.get("/:keyword", searchProducts);


module.exports = router
