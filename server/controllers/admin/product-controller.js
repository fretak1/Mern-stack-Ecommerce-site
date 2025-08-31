const { imageUploadutil } = require("../../helpers/cloudinary");
const product = require("../../model/product");



const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadutil(url);

    res.json({
      success: true,
      url: result.secure_url, // Assuming Cloudinary returns secure_url
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred",
    });
  }
};

//add new product
const addProduct = async  (req,res) => {
  
  
   try {

     console.log(req.body)


    const {
    image,title,description,
    catagory,brand,price,
    salePrice,totalStock} = req.body;

   const newlyCreatedProduct = new product({
    image,title,description,
    catagory,brand,price,
    salePrice,totalStock
   })

   await newlyCreatedProduct.save();
   res.status(201).json({
    success : true,
    data : newlyCreatedProduct
   })

    
   } catch (error) {
    console.error(error)
    res.status(500).json({
      success : false,
      message : "something error occurred"
    })
   }
  
}

//fetch all products
const fetchAllProduct = async (req,res) => {

  try {

    const listOfAllProduct = await product.find({});
    res.status(200).json({
      success : true,
      data : listOfAllProduct
    })

  } catch (error) {
    res.status(500).json({
      success : false,
      message : "something error occurred"
    })
  }
}

//edit product 
const editProduct = async (req,res) => {
  try {

     console.log(req.body)


    const {id} = req.params;
    const {
    image,title,description,
    catagory,brand,price,
    salePrice,totalStock} = req.body;

    const findProduct = await product.findById(id);

    if(!findProduct) {
      return res.status(404).json({
        success : false,
        message : "Product Not Found"
      })
    }

    console.log(req.body)

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.catagory = catagory || findProduct.catagory;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === '' ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    
    if (image && image.trim() !== '') {
  findProduct.image = image;
}
    
    await findProduct.save();
    res.status(200).json({
      success : true,
      data : findProduct
    })
    
  } catch (error) {
    res.status(500).json({
      success : false,
      message : "something error occurred"
    })
  }
}

//delete product
const deleteProduct = async (req,res) => {
  try {

     const {id} = req.params;
    const deletedProduct = await product.findByIdAndDelete(id);

if (!deletedProduct) {
  return res.status(404).json({
    success: false,
    message: "Product Not Found",
  });
}


    res.status(200).json({
      success : true,
      message : " Product deleted successfully"
    })
    
  } catch (error) {
    res.status(500).json({
      success : false,
      message : "something error occurred"
    })
  }
}

module.exports = { handleImageUpload, addProduct, fetchAllProduct, editProduct, deleteProduct};
