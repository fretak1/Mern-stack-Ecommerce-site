const product = require("../../model/product")


const searchProducts = async(req,res) => {
     try {

        


       const {keyword} = req.params
       
       if(!keyword || typeof keyword !== 'string') {
        return res.status(400).json({
            success : false,
            message : "Keyword is required and it should be in string format"
        })
       }

       const regEx = new RegExp(keyword,'i')

       const  createSearchQuery = {
        $or : [
            {title : regEx},
            {description : regEx},
            {catagory : regEx},
            {brand : regEx}
        ]
       }

       const searchResult = await product.find(createSearchQuery);

       console.log(searchResult,"searchreeeeeeeeeeeeeeeeeeeeee")

       res.status(200).json({
        success : true,
        data : searchResult
       })

       
     } catch (error) {
        console.log(error);
        res.status(500).json({
            success : false,
            message : "Something Error Occured"
        })
     }
}

module.exports = {searchProducts}