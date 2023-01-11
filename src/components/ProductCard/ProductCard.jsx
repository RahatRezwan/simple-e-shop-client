import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ProductCard = ({ product }) => {
   const [value, setValue] = useState(0);

   const handleAddToCart = () => {
      setValue(value + 1);

      axios
         .post("https://e-shop-server-six.vercel.app/carts", product)
         .then((response) => {
            if (response.data.acknowledged) {
               toast.success("product Created Successfully");
            }
         })
         .catch((error) => {
            console.log(error);
         });
   };
   return (
      <div className="rounded-md shadow-md p-5 border">
         <div className="w-[60%] mx-auto mb-3">
            <img src={product.picture} alt="" className="w-full" />
         </div>

         <h1 className="text-xl font-bold mb-4">{product.name}</h1>
         <div className="flex justify-between items-center">
            <h4 className="text-lg font-bold">Price: ${product.price}</h4>
            {value > 0 ? (
               <>
                  <div className="flex gap-2">
                     <button
                        onClick={() => setValue(value - 1)}
                        className="font-bold btn btn-sm bg-[#975EFE] hover:bg-[#975EFE] text-white border-none"
                     >
                        -
                     </button>
                     <button className="text-lg font-bold">{value}</button>
                     <button
                        onClick={() => setValue(value + 1)}
                        className="font-bold btn btn-sm bg-[#975EFE] hover:bg-[#975EFE] text-white border-none"
                     >
                        +
                     </button>
                  </div>
               </>
            ) : (
               <button
                  onClick={handleAddToCart}
                  className="font-bold btn btn-sm bg-[#975EFE] hover:bg-[#975EFE] text-white border-none"
               >
                  Add To Cart
               </button>
            )}
         </div>
      </div>
   );
};

export default ProductCard;
