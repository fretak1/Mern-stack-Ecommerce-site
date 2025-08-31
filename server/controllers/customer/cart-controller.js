const Cart = require("../../model/Cart");
const product = require("../../model/product")



const addToCart = async(req,res) => {
    try {

         const {userId,productId,quantity} = req.body;

   if(!userId || !productId || quantity <= 0) {
    return res.status(400).json({
        success : false,
        message : 'Invalid Data Provided'
    })
   }

   const Product = await product.findById(productId)
 
  if(!Product) {
    return res.status(404).json({
        success : false,
        message : 'Product Not Found'
    })
  }

  let cart = await Cart.findOne({userId});

  if(!cart) {
    cart = new Cart({userId,items : []})
  }

  const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

  if(findCurrentProductIndex === -1) {
    cart.items.push({productId,quantity})
  } else {
    cart.items[findCurrentProductIndex].quantity += quantity
  }

  await cart.save()

  res.status(200).json({
    success  : true,
    data : cart
  })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error ocurred'
        })
    }
}

const fetchCartItems = async(req,res) => {
    try {

        const {userId} = req.params;

        if(!userId) {
        return res.status(404).json({
           success : false,
           message : 'User Id Is Required'
             })
        }

        const cart = await Cart.findOne({userId}).populate({
            path : 'items.productId',
            select : 'image title price salePrice'
        })
        
        if(!cart) {
            return res.status(404).json({
        success : false,
        message : 'Cart Not Found'
             })
        }

        const validItems = cart.items.filter(productItem => productItem.productId);
        if(validItems.length < cart.items.length) {
            cart.items = validItems;
            await cart.save()
        }

      const populateCartItems = validItems.map(item => ({
              productId : item.productId._id,
              image : item.productId.image,
              title : item.productId.title,
              price : item.productId.price,
              salePrice : item.productId.salePrice,
              quantity : item.quantity
      }))

      res.status(200).json({
        success : true,
        data : {
            ...cart._doc,
            items : populateCartItems
        }
      })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error ocurred'
        })
    }
}

const updateCartItemQuantity = async(req,res) => {
    try {

        
         const {userId,productId,quantity} = req.body;

    if(!userId || !productId || quantity <= 0) {
         return res.status(400).json({
           success : false,
           message : 'Invalid Data Provided'
        })
        }

  let cart = await Cart.findOne({userId});

  if(!cart) {
            return res.status(404).json({
        success : false,
        message : 'Cart Not Found'
             })
        }

    const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

     if(findCurrentProductIndex === -1) {
          return res.status(404).json({
            success : false,
            message : "cart item not found"
          })
     }

     cart.items[findCurrentProductIndex].quantity = quantity
     await cart.save()

     await cart.populate({
            path : 'items.productId',
            select : 'image title price salePrice'
        })
      const populateCartItems = cart.items.map(item => ({
              productId : item.productId ? item.productId._id : null,   
              image : item.productId ? item.productId.image : null,
              title :item.productId ? item.productId.title : 'product not found',
              price : item.productId ? item.productId.price : null,
              salePrice : item.productId ? item.productId.salePrice : null,
              quantity : item.quantity
      }))

      res.status(200).json({
        success : true,
        data : {
            ...cart._doc,
            items : populateCartItems
        }
      })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error ocurred'
        })
    }
}

const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params; // or req.body depending on route

    if (!userId || !productId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Data Provided'
      });
    }

    let cart = await Cart.findOne({ userId }).populate({
      path: 'items.productId',
      select: 'image title price salePrice'
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart Not Found'
      });
    }

    console.log("Before delete:", cart.items.map(i => i.productId?._id?.toString()));


    cart.items = cart.items.filter(
      (item) => item.productId && item.productId._id.toString() !== productId
    );

  console.log("After delete:", cart.items.map(i => i.productId?._id?.toString()));


    await cart.save();

    console.log("Cart saved with items:", cart.items.map(i => i.productId?._id?.toString()));


    await cart.populate({
      path: 'items.productId',
      select: 'image title price salePrice'
    });

    const populateCartItems = cart.items.map((item) => {
      if (!item.productId) {
        return {
          productId: null,
          image: null,
          title: 'product not found',
          price: null,
          salePrice: null,
          quantity: item.quantity
        };
      }

      const { _id, image, title, price, salePrice } = item.productId;
      return {
        productId: _id,
        image,
        title,
        price,
        salePrice,
        quantity: item.quantity
      };
    });

    res.status(200).json({
      success: true,
      data: {
        ...cart._doc,
        items: populateCartItems
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'error occurred'
    });
  }
};

module.exports = {addToCart,fetchCartItems,updateCartItemQuantity,deleteCartItem}