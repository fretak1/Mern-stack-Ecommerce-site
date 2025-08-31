const express = require("express");
const { searchProducts } = require("../../controllers/customer/search-controller");
const { addProductReview, getProductReviews } = require("../../controllers/customer/product-review-controller");



const router = express.Router();


router.get("/:productId", getProductReviews);
router.post("/add", addProductReview);


module.exports = router
