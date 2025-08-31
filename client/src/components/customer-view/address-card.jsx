import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Label } from "../ui/label";



function AddressCard({
  addressInfo
  ,handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  selectedId
}) {

console.log(selectedId , 'eeeeeeeeeeee',addressInfo?._id)    
  return (
    <Card 
     className={`cursor-pointer border ${
    selectedId?._id === addressInfo?._id
      ? "border-red-900 border-[4px]"
      : "border-black"
  }`}

    onClick={ setCurrentSelectedAddress ? () => setCurrentSelectedAddress(addressInfo) : null}>
        <CardContent className={`${selectedId === addressInfo?._id ? "border-black" : ''} grid p-4 gap-4`}>
            <Label>Address : {addressInfo?.address}</Label>
            <Label>City : {addressInfo?.city}</Label>
            <Label>Pincode : {addressInfo?.pincode}</Label>
            <Label>Phone : {addressInfo?.phone}</Label>
            <Label>Notes : {addressInfo?.notes}</Label>
        </CardContent>
        <CardFooter className="p-3 flex justify-between">
            <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
            <Button onClick={() => handleDeleteAddress(addressInfo)}>Delete</Button>
        </CardFooter>
    </Card>
  )
}

export default AddressCard;