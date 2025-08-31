import ImageUpload from "@/components/admin-view/image-upload";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { addNewProduct, deleteProduct, editProduct, fetchAllProduct } from "@/store/admin/product-slice";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProductTile from "./product-tile";
import { data } from "react-router-dom";


const initialFormData = {
    image : null,
    title : "",
    description : "",
    catagory : "",
    brand : "",
    price : "",
    salePrice : "",
    totalStock : ""
}




function AdminProducts() {

   const [openCreateProductsDialoge ,setOpenCreateProductsDialoge] =useState(false)
   const [formData,setFormData] = useState(initialFormData);
   const [imageFile,setImageFile] = useState(null);
   const [uploadedImageUrl,setUploadedImageUrl] = useState(' ');
   const [imageLoadingState, setImageLoadingState] = useState(false)
   const dispatch = useDispatch()
   const {productList} = useSelector(state=>state.adminProduct)
   const [currentEditedId, setCurrentEditedId] = useState(null);
   const {toast} = useToast()

  function onSubmit(event) {
   event.preventDefault()

   currentEditedId !== null ?
   dispatch(editProduct({
    id : currentEditedId ,
     ...formData,
    image: uploadedImageUrl
   })).then((data) =>{
     if(data) {
        dispatch(fetchAllProduct())
        setCurrentEditedId(null)
        setOpenCreateProductsDialoge(false)
        setFormData(initialFormData)
     }
   }) :
   dispatch(addNewProduct({
    ...formData, image : uploadedImageUrl
   })).then((data) => {
    if(data?.payload?.success) {
        dispatch(fetchAllProduct())
        setImageFile(null)
        setFormData(initialFormData);
        setOpenCreateProductsDialoge(false);
        toast({
            title : "Product Added Successfully",
        })
        
    }
   })
}


function isFormValid() {
  return Object.keys(formData).map((key) => formData[key] !== "").every((item) => item)
}


function handleDelete(getCurrentProductId) {
   console.log(getCurrentProductId)
   dispatch(deleteProduct(getCurrentProductId)).then((data) => {
    if(data?.payload?.success) {
        dispatch(fetchAllProduct())  
    }
   })
}



useEffect(() => {
  dispatch(fetchAllProduct())
}, [dispatch])

    return(
        <Fragment>
          <div className="flex mb-5 w-full justify-end">
           <Button onClick={ ()=> setOpenCreateProductsDialoge(true)}>Add New Products</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {
                productList && productList.length > 0 ? 
                productList.map(productItem =>  <AdminProductTile 
                  setCurrentEditedId={setCurrentEditedId} 
                  setFormData={setFormData} 
                  handleDelete={handleDelete}
                   setOpenCreateProductsDialoge={setOpenCreateProductsDialoge} 
                   product={productItem}/>) : null
            }
          </div>
          <Sheet open={openCreateProductsDialoge} onOpenChange={ ()=> {
            setOpenCreateProductsDialoge(false)
            setCurrentEditedId(null)
            setFormData(initialFormData)
            
            }}>
           <SheetContent side="right" className="overflow-auto">
            <SheetHeader>
                <SheetTitle>
                    {
                     currentEditedId !== null ? 'Edit Product':'Add New Product'  
                    }
                </SheetTitle>
            </SheetHeader>
            <ImageUpload 
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl} 
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
               />
            <div className="py-6">
                 <CommonForm 
                  formControls={addProductFormElements}
                  formData={formData}
                  setFormData={setFormData}
                  isBtnDisabled={!isFormValid()}
                  buttonText={
                     currentEditedId !== null ? 'Edit':'Add'  
                    }
                  onSubmit={onSubmit}
                 />
            </div>
           </SheetContent>  
          </Sheet>
        </Fragment>
    )
}

export default AdminProducts;