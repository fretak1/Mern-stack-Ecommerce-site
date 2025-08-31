const Address = require("../../model/Address")



const addAddress = async(req,res) => {

    try {

        const {userId,address,city,pincode,phone,notes} = req.body;

        
          if(!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success : false,
                message : 'Invalid Data Provided'
            })
            }

            const newlyCreatedAddress = new Address({userId,address,city,pincode,phone,notes})

            await newlyCreatedAddress.save()
            
            res.status(200).json({
                success : true,
                data : newlyCreatedAddress
            })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Something Error Occured'
        })
    }
}

const editAddress = async(req,res) => {

    try {

         const {userId,addressId} = req.params;
         const formData = req.body;

        
          if(!userId || !addressId) {
            return res.status(400).json({
                success : false,
                message : 'userId and addressId is Required'
            })
            }

            const address = await Address.findOneAndUpdate({
                _id : addressId, userId
            },formData,{new : true})

              if(!address) {
            return res.status(404).json({
                success : false,
                message : 'Adress Not Found'
            })
            }

              res.status(200).json({
                success : true,
                data : address
            })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Something Error Occured'
        })
    }
}

const deleteAddress = async(req,res) => {

    try {

          const {userId,addressId} = req.params;
          
 
          if(!userId || !addressId) {
            return res.status(400).json({
                success : false,
                message : 'userId and addressId is Required'
            })
            }

            const address = await Address.findOneAndDelete({_id : addressId, userId});

             if(!address) {
            return res.status(404).json({
                success : false,
                message : 'Adress Not Found'
            })
            }

              res.status(200).json({
                success : true,
                message : "Address Deleted Successfully"
            })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Something Error Occured'
        })
    }
}

const fetchAllAddress = async(req,res) => {

    try {

          const {userId} = req.params;

        
          if(!userId) {
            return res.status(400).json({
                success : false,
                message : 'userId is Required'
            })
            }

            const addressList = await Address.find({userId})

            res.status(200).json({
                success : true,
                data : addressList
            })

            console.log(addressList)

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'Something Error Occured'
        })
    }
}

module.exports = {addAddress,editAddress,deleteAddress,fetchAllAddress};