import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "../../components/SmallSpinner/SmallSpinner";

const AddUser = () => {
   const [loader, setLoader] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const navigate = useNavigate();
   const imgHostKey = process.env.REACT_APP_imgbb_key;

   const handleRegister = (data, event) => {
      setLoader(true);
      const form = event.target;
      const fullName = data.firstName + " " + data.lastName;
      /* send the uploaded image to the server */
      const profileImg = data.profilePic[0];
      const formData = new FormData();
      formData.append("image", profileImg);

      /* Host Image to imgBB */
      axios
         .post(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, formData)
         .then((imgResponse) => {
            const user = {
               profilePic: imgResponse.data.data.url,
               name: fullName,
               email: data.email,
               role: data.role,
               plan: data.plan,
            };

            axios
               .post("https://e-shop-server-six.vercel.app/users", user)
               .then((response) => {
                  if (response.data.acknowledged) {
                     setLoader(false);
                     form.reset();
                     toast.success("User Created Successfully");
                     navigate("/admin/allusers");
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
         <h1 className="text-4xl mb-4 text-center font-bold">Add User</h1>
         <form onSubmit={handleSubmit(handleRegister)} className="">
            <div className="form-control">
               <label className="label">
                  <span className="label-text">Profile Picture</span>
               </label>
               <input type="file" {...register("profilePic")} />
            </div>
            <div className="grid grid-cols-2 gap-3">
               <div className="form-control">
                  <label className="label">
                     <span className="label-text">First Name</span>
                  </label>
                  <input
                     type="text"
                     placeholder="First Name"
                     className={`input input-bordered ${errors?.firstName && "input-error"}`}
                     {...register("firstName", { required: "First Name is required" })}
                  />
                  <p className="text-red-500">{errors.firstName?.message}</p>
               </div>

               <div className="form-control">
                  <label className="label">
                     <span className="label-text">Last Name</span>
                  </label>
                  <input
                     type="text"
                     placeholder="Last Name"
                     className={`input input-bordered ${errors?.lastName && "input-error"}`}
                     {...register("lastName", { required: "Last name is required" })}
                  />
                  <p className="text-red-500">{errors.lastName?.message}</p>
               </div>
            </div>

            <div className="form-control">
               <label className="label">
                  <span className="label-text">Email</span>
               </label>
               <input
                  type="email"
                  placeholder="Email"
                  className={`input input-bordered ${errors?.email && "input-error"}`}
                  {...register("email", { required: "Valid email is required" })}
               />
               <p className="text-red-500">{errors.email?.message}</p>
            </div>

            <div className="form-control">
               <label className="label">
                  <span className="label-text">Choose Role</span>
               </label>
               <select
                  defaultValue="Editor"
                  className="select select-bordered w-full"
                  {...register("role")}
               >
                  <option>Editor</option>
                  <option>Author</option>
                  <option>Maintainer</option>
               </select>
            </div>

            <div className="form-control">
               <label className="label">
                  <span className="label-text">Choose Plan</span>
               </label>
               <select
                  defaultValue="Company"
                  className="select select-bordered w-full"
                  {...register("plan")}
               >
                  <option>Company</option>
                  <option>Enterprise</option>
                  <option>Team</option>
               </select>
            </div>

            <button className="btn btn-primary w-full mt-3">
               {loader ? <SmallSpinner /> : "Add User"}
            </button>
         </form>
      </div>
   );
};

export default AddUser;
