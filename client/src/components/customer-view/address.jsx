import { useEffect, useState } from "react"
import CommonForm from "../common/form"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { addressFormControls } from "@/config"
import { useDispatch, useSelector } from "react-redux"
import { addNewAddress, deleteAddress, editAnAddress, fetchAllAddresses } from "@/store/customer/address-slice"
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast"



    const initialAddressFormData = {
         address : '',
         city : '',
         phone : '',
         pincode : '',
         notes : ''
       }

function Address({setCurrentSelectedAddress,selectedId}) {

    const [formData,setFormData] = useState(initialAddressFormData)
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {addressList} = useSelector(state => state.customerAddress)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const {toast} = useToast()

        function manageAddress(event) {
            event.preventDefault();

            if(addressList.length >= 3 && currentEditedId === null) {
                setFormData(initialAddressFormData)
                toast({
                    title : "You can add maximumm of 3 addresses",
                    variant : 'destructive'
                })

                return;
            }

            currentEditedId !== null ? dispatch(editAnAddress({
                userId : user?.id,addressId : currentEditedId, formData
            })).then((data) => {
                 if(data?.payload?.data) {
                    dispatch(fetchAllAddresses(user?.id))
                    setFormData(initialAddressFormData)
                    setCurrentEditedId(null)
                    toast({
                        title : "Address Updated Successfully"
                    })
                }
            }) : dispatch(addNewAddress({
                ...formData,
                userId : user?.id
            })).then((data) => {
                if(data?.payload?.data) {
                    dispatch(fetchAllAddresses(user?.id))
                    setFormData(initialAddressFormData)
                    toast({
                        title : "Address Added Successfully"
                    })
                }
            })
        }

        function isFormValid() {
            return Object.keys(formData).map((key) => formData[key].trim() !== "").every((item) => item)
        }

        useEffect(() => {
            dispatch(fetchAllAddresses(user?.id))
        },[dispatch])

        function handleDeleteAddress(getCurrentAddress) {
            console.log({userId : user?.id , addressId : getCurrentAddress._id});
            dispatch(deleteAddress({userId : user?.id , addressId : getCurrentAddress._id})).then((data) =>{
                if(data?.payload?.success) {
                    dispatch(fetchAllAddresses(user?.id))
                    setFormData(initialAddressFormData)
                     toast({
                        title : "Address Deleted Successfully"
                    })
                }
            })
        }

        function handleEditAddress(getCurrentAddress) {
           setCurrentEditedId(getCurrentAddress._id)
           setFormData({
            ...formData,
            address : getCurrentAddress?.address,
            city : getCurrentAddress?.city,
            phone : getCurrentAddress?.phone,
            pincode : getCurrentAddress?.pincode,
            notes : getCurrentAddress?.notes
           })
        }
   

    return (
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
              {
                addressList && addressList.length > 0 ? addressList.map((singleAddressItem) => 
                <AddressCard
                 selectedId={selectedId}
                 handleDeleteAddress={handleDeleteAddress}  
                 addressInfo={singleAddressItem}
                 handleEditAddress={handleEditAddress}
                 setCurrentSelectedAddress={setCurrentSelectedAddress}
                 />) : null
              }
            </div>
            <CardHeader>
               <CardTitle>{currentEditedId !== null ? 'Edit Address' : 'Add New Address'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <CommonForm
               formControls={addressFormControls}
               formData={formData}
               setFormData={setFormData}
               buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
               onSubmit={manageAddress}
               isBtnDisabled={!isFormValid()}
              />
            </CardContent>
        </Card>
    )
}

export default Address