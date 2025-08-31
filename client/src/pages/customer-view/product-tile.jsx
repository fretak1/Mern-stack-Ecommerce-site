import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionsMap, catagoryOptionsMap } from "@/config";



function CustomerProductTile( {handleGetProductDetails,product,handleAddToCart} ) {
    return (
        <Card className="w-full max-w-sm mx-auto">
            <div onClick={() => handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img src={product?.image} alt={product?.title} 
                    className="w-full h-[300px] object-cover rounded-t-lg" />
                    {   
                        product?.totalStock === 0 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        Out Of Stock</Badge> :  product?.totalStock < 10 ? <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        {`only ${product?.totalStock} items left`}</Badge> :
                        product?.salePrice > 0 ? 
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                        Sale</Badge> : null
                    }
                </div>
                <CardContent className="p-4">
                    <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">{catagoryOptionsMap[product?.catagory]}</span>
                        <span className="text-sm text-muted-foreground">{brandOptionsMap[product?.brand]}</span>
                     </div>  
                     <div className="flex justify-between items-center mb-2">
                        <span className={`${product?.price > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>{product?.price}</span>
                        {
                            product?.salePrice > 0 ? <span className="text-lg font-semibold text-primary">{product?.salePrice}</span>
                            : null
                        }
                      </div>
                    
                </CardContent>
               
            </div>
             <CardFooter>
                {
                    product?.totalStock === 0 ?   <Button 
                    className="w-full opacity-55 cursor-not-allowed">Out Of Stock</Button> :  <Button 
                    onClick={() => handleAddToCart(product?._id,product?.totalStock)}
                    className="w-full">Add To Cart</Button>
                }
                   
                </CardFooter>
        </Card>
    )
}

export default CustomerProductTile;