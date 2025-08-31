const express = require("express");
const { getFiteredProducts ,getProductDetails} = require("../../controllers/customer/product-controller");


const router = express.Router();
router.get("/get", getFiteredProducts);
router.get("/get/:id", getProductDetails);


module.exports = router;