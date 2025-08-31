const product = require("../../model/product");




const getFiteredProducts = async( req,res ) => {
  try {


    const {category = [], brand = [], sortBy = 'price-lowtohigh'} = req.query

    let filters = {};

    if(category.length) {
      filters.catagory = {$in : category.split(',')}
    }

    if(brand.length) {
      filters.brand = {$in : brand.split(',')}
    }

    let sort = {}

    switch (sortBy) {
        case 'price-lowtohigh':
        sort.price = 1
        break;
        case 'price-hightolow':
        sort.price = -1
        break;
        case 'title-AtoZ':
        sort.title = 1
        break;
        case 'title-ZtoA':
         sort.title = -1
        break;
        default:
         sort.price = 1
        break;
    }


    const products = await product.find(filters).sort(sort);

    console.log("req.query:", req.query);
    console.log("catagory:", category, "brand:", brand, "sortBy:", sortBy);
    console.log("Filters being applied:", filters);



    res.status(200).json({
        success : true,
        data : products
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
        success : false,
        message : 'something error occured'
    })
  }
}

const getProductDetails = async(req, res) => {

  try {
    const{id} = req.params;
    const Product = await product.findById(id)

    if(!Product) return res.status(404).json({
      success : false,
      message : 'Product Not Found'
    })

    
    res.status(200).json({
      success : true,
      data : Product
    })


  } catch (error) {
     console.log(error)
    res.status(500).json({
        success : false,
        message : 'something error occured'
    })
  }
}
module.exports = {getFiteredProducts,getProductDetails}