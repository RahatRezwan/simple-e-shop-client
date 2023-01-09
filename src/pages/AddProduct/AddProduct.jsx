import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import SmallSpinner from "../../components/SmallSpinner/SmallSpinner";

const AddProduct = () => {
   const [loader, setLoader] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const imgHostKey = process.env.REACT_APP_imgbb_key;

   const handleRegister = (data, event) => {
      setLoader(true);
      const form = event.target;
      /* send the uploaded image to the server */
      const profileImg = data.picture[0];
      const formData = new FormData();
      formData.append("image", profileImg);

      /* Host Image to imgBB */
      axios
         .post(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, formData)
         .then((imgResponse) => {
            const product = {
               picture: imgResponse.data.data.url,
               name: data.productName,
               price: data.price,
            };

            axios
               .post("https://e-shop-server-six.vercel.app/products", product)
               .then((response) => {
                  if (response.data.acknowledged) {
                     setLoader(false);
                     form.reset();
                     toast.success("product Created Successfully");
                  }
               })
               .catch((error) => {
                  setLoader(false);
                  console.log(error);
               });
         })
         .catch((error) => {
            setLoader(false);
            toast.error(error);
         });
   };
   return (
      <div className="w-[85%] md:w-[50%] xl:w-[33%] mx-auto border border-primary rounded-md p-7 my-16">
         <h1 className="text-4xl mb-4 text-center font-bold">Add Product</h1>
         <form onSubmit={handleSubmit(handleRegister)} className="">
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Product Picture</span>
               </label>
               <input type="file" {...register("picture")} />
            </div>

            <div className="form-control">
               <label className="label">
                  <span className="label-text">Product Name</span>
               </label>
               <input
                  type="text"
                  placeholder="product Name"
                  className={`input input-bordered ${errors?.firstName && "input-error"}`}
                  {...register("productName", { required: "Product Name is required" })}
               />
               <p className="text-red-500">{errors.firstName?.message}</p>
            </div>

            <div className="form-control">
               <label className="label">
                  <span className="label-text">Price</span>
               </label>
               <input
                  type="text"
                  placeholder="price"
                  className={`input input-bordered ${errors?.email && "input-error"}`}
                  {...register("price", { required: "Price is required" })}
               />
               <p className="text-red-500">{errors.email?.message}</p>
            </div>

            <button className="btn btn-primary w-full mt-3">
               {loader ? <SmallSpinner /> : "Add Product"}
            </button>
         </form>
      </div>
   );
};

export default AddProduct;
