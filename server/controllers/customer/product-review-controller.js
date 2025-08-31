
const Order = require("../../model/Order")
const Product = require("../../model/product")
const ProductReview = require("../../model/Review")





const addProductReview = async(req,res) => {
    try {

        const {productId ,
    userId,
    userName ,
    reviewMessage ,
    reviewValue  } = req.body

    const order = await Order.findOne({
        userId,
        "cartItems.productId" : productId,
        orderStatus : 'Confirmed'
    })
 
    
    const orders = await Order.find({ userId });
    console.log("User Orders:", orders);



     if(!order) {
            return res.status(403).json({
                success : false,
                message : 'You need to Purchase the product to review it'
            })
            }

       const checkExistingReview = await ProductReview.findOne({userId,productId})

        if(checkExistingReview) {
            return res.status(400).json({
                success : false,
                message : 'You allready reviewed this product'
            })
            }

            const newReview = new ProductReview({productId ,
                                                    userId,
                                                    userName ,
                                                    reviewMessage ,
                                                    reviewValue  })

            await newReview.save()

            const reviews = await ProductReview.find({productId})
            const totalReviewLengh = reviews.length
            const averageReview = reviews.reduce((sum,reviewItem) => sum + reviewItem.reviewValue, 0) / totalReviewLengh
            
            await Product.findByIdAndUpdate(productId, {averageReview})

             res.status(201).json({
                success : true,
                data : newReview
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Something Error Occurred" 
        })
    }
}

const getProductReviews = async(req,res) => {
    try {

        const {productId} = req.params;

        const reviews = await ProductReview.find({productId})

        res.status(200).json({
                success : true,
                data : reviews
            })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : "Something Error Occurred" 
        })
    }
}

module.exports = {addProductReview,getProductReviews}
