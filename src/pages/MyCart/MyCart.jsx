import { useQuery } from "@tanstack/react-query";
import React from "react";
import SmallSpinner from "../../components/SmallSpinner/SmallSpinner";

const MyCart = () => {
   const { data: carts = [], isLoading } = useQuery({
      queryKey: ["carts"],
      queryFn: () =>
         fetch(`https://e-shop-server-six.vercel.app/carts`, {}).then((res) => res.json()),
   });
   if (isLoading) {
      return (
         <div className="flex justify-center items-center">
            <SmallSpinner />
         </div>
      );
   }
   return (
      <div className="max-w-[700px] w-[95%] mx-auto border my-5 rounded">
         <h1 className="text-3xl font-bold my-10 text-center">My Cart</h1>
         <div className="flex flex-col w-full justify-start items-start gap-3 p-5">
            {carts.map((product) => (
               <div className="flex items-center w-full gap-4 border rounded-lg p-5 shadow-md">
                  <img src={product.picture} alt="" className="w-[100px]" />
                  <div className="t">
                     <h1 className="text-md font-bold">{product.name}</h1>
                     <h1>
                        price: <strong>${product.price}</strong>
                     </h1>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default MyCart;
