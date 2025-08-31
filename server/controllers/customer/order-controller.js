const paypal = require('../../helpers/paypal')
const Order = require('../../model/Order')
const Cart = require('../../model/Cart')
const Product = require('../../model/product')

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      paymentId,
      payerId,
      cartId
    } = req.body;

    

    // Validate cartItems
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty or invalid."
      });
    }

    const create_payment_json = {
      intent: 'sale',
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: "http://localhost:5173/customer/paypal-return",
        cancel_url: "http://localhost:5173/customer/paypal-cancel"
      },
      transactions: [
        {
          item_list: {
            items: cartItems.map(item => ({
              name: item.title || "Item",
              sku: item.productId || "N/A",
              price: Number(item.price || 0).toFixed(2),
              currency: "USD",
              quantity: Number(item.quantity || 1)
            }))
          },
          amount: {
            currency: 'USD',
            total: Number(totalAmount || cartItems.reduce((sum, i) => sum + (i.price || 0) * (i.quantity || 1), 0)).toFixed(2)
          },
          description: "Purchase from MyEcommerceWebsite"
        }
      ]
    };

    paypal.payment.create(create_payment_json, async (error, paymentInfo) => {
      if (error) {
        console.log("PayPal error details:", JSON.stringify(error.response, null, 2));
        return res.status(500).json({
          success: false,
          message: "Error while creating PayPal payment",
          details: error.response
        });
      }

      // Create Order in DB
      const newlyCreatedOrder = new Order({
        userId,
        cartItems,
        addressInfo,
        orderStatus,
        paymentMethod,
        paymentStatus,
        totalAmount,
        orderDate,
        orderUpdateDate,
        paymentId,
        payerId,
        cartId
      });

      
    

      await newlyCreatedOrder.save();

      // Get PayPal approval URL
      const approvalURL = paymentInfo.links.find(link => link.rel === 'approval_url')?.href;

      if (!approvalURL) {
        return res.status(500).json({
          success: false,
          message: "Approval URL not found in PayPal response."
        });
      }

      res.status(201).json({
        success: true,
        approvalURL,
        orderId: newlyCreatedOrder._id
      });
    });

  } catch (error) {
    console.log("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong on the server."
    });
  }
};


const capturePayment = async(req,res) => {
    try {

        const {paymentId,payerId,orderId} = req.body

        let order = await Order.findById(orderId)

        if(!order) {
            return res.status(404).json({
                success : false,
                message : "Order Not Found"
            })
        }

        order.paymentStatus = 'paid';
        order.orderStatus = 'Confirmed';
        order.paymentId = paymentId;
        order.payerId = payerId;

        for(let item of order.cartItems){
          let product = await Product.findById(item.productId)

          if(!product) {
            return res.status(404).json({
                success : false,
                message : `Not enough stock for this ${product.title}`
            })
        }
           
        product.totalStock -= item.quantity
        await product.save()
        
        }
        
        const getCartId = order.cartId
        await Cart.findByIdAndDelete(getCartId)


        await order.save()

        res.status(200).json({
            success : true,
            message : 'Order Confirmed',
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

const getAllOrdersByUser = async(req,res) => {
  try {

    const {userId} = req.params;

    const orders  = await Order.find({userId})

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

const getOrderDetails = async(req,res) => {
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

    console.log(order)
    
  } catch (error) {
     console.log(error)
        res.status(500).json({
            success : false,
            message : "something error ocurred"
        })
  }
}

module.exports = { createOrder, capturePayment, getAllOrdersByUser,getOrderDetails};
