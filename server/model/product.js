const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    catagory: {   // ✅ fixed spelling
      type: String,
      required: [true, "Catagory is required"],
      enum: ["men", "women", "kids", "accessories", "footwear", "sportswear"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      enum: ["nike", "adidas", "puma", "reebok", "under-armour"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    salePrice: {
      type: Number,
      min: [0, "Sale price must be a positive number"],
      validate: {
        validator: function (value) {
          return value == null || value <= this.price;
        },
        message: "Sale price cannot be greater than the original price",
      },
    },
    totalStock: {
      type: Number,
      required: [true, "Total stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    image: {   // ✅ added image
      type: String,
      required: [true, "Product image is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
