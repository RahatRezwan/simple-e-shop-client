import { useQuery } from "@tanstack/react-query";
import React from "react";
import Banner from "../../components/Banner/Banner";
import ProductCard from "../../components/ProductCard/ProductCard";
import SmallSpinner from "../../components/SmallSpinner/SmallSpinner";

const Shop = () => {
   const { data: products = [], isLoading } = useQuery({
      queryKey: ["products"],
      queryFn: () =>
         fetch(`https://e-shop-server-six.vercel.app/products`, {}).then((res) => res.json()),
   });
   if (isLoading) {
      return (
         <div className="flex justify-center items-center">
            <SmallSpinner />
         </div>
      );
   }
   return (
      <div className="max-w[1200px] w-[95%] mx-auto">
         {/* Banner Section */}
         <Banner />
         <h1 className="text-4xl font-bold text-center my-10">All Products</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product) => (
               <ProductCard key={product._id} product={product} />
            ))}
         </div>
      </div>
   );
};

export default Shop;
