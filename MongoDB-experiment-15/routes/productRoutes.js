const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.post("/add", productController.addProduct);
router.get("/", productController.getProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/variants/:id", productController.getVariantDetails);

module.exports = router;
