const paypal = require('../../helpers/paypal')
const Order = require('../../model/Order')
const Cart = require('../../model/Cart')



const getAllOrdersOfAllUser = async(req,res) => {
  try {

    

    const orders  = await Order.find({ })

    if(!orders.length) {
      res.status(404).json({
        success : false,
        message : "No orders Found "
      })
    }
    
    res.status(200).json({
      success : true,
      data : orders
    })


  } catch (error) {
     console.log(error)
        res.status(500).json({
            success : false,
            message : "something error ocurred"
        })
  }
}

const getOrderDetailsForAdmin = async(req,res) => {
  try {

      const {id} = req.params;

      const order = await Order.findById(id)

      if(!order) {
        res.status(404).json({
          success : false,
          message : "Order Not Found "
        })
      }

      res.status(200).json({
      success : true,
      data : order
    })

    
    
  } catch (error) {
     console.log(error)
        res.status(500).json({
            success : false,
            message : "something error ocurred"
        })
  }
}

const updateOrderStatus = async(req,res) => {
  
  try {

    const {id} = req.params;
    const {orderStatus} = req.body

     const order = await Order.findById(id)

      if(!order) {
        res.status(404).json({
          success : false,
          message : "Order Not Found "
        })
      }

      await Order.findByIdAndUpdate(id, {orderStatus})

      res.status(200).json({
      success : true,
      message : "Order Status is updated successfully"
    })
    
  } catch (error) {
     console.log(error)
        res.status(500).json({
            success : false,
            message : "something error ocurred"
        })
  }
}

module.exports = {getAllOrdersOfAllUser,getOrderDetailsForAdmin,updateOrderStatus};