import ImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/customer/common-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



function AdminDashboard() {
    
       const [imageFile,setImageFile] = useState(null);
       const [uploadedImageUrl,setUploadedImageUrl] = useState(' ');
       const [imageLoadingState, setImageLoadingState] = useState(false)
       const {featureImageList} = useSelector(state => state.feature)
       const dispatch = useDispatch()

      function handleUploadFeatureImage() {
         dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
            if(data?.payload?.success) {
                dispatch(getFeatureImages())
                setImageFile(null)
                setUploadedImageUrl('')
            }
         })
      }
          
      useEffect(() => {
        dispatch(getFeatureImages())
      },[dispatch])

      
       

    return(
        <div>
            
             <ImageUpload 
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadedImageUrl={uploadedImageUrl} 
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isCustomeStyling={true}
              //isEditMode={currentEditedId !== null}
               /> 
               <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">Upload</Button>
               <div className="flex flex-col gap-4 mt-5">
                {
                    featureImageList && featureImageList.length > 0 ?
                    featureImageList.map(imageItem => 
                    <div className="relative ">
                        <img className="w-full h-[300px] object-cover rounded-t-lg"  src={imageItem.image} alt="" />
                    </div>) : null
                }
               </div>
        </div>
    )
}

export default AdminDashboard;