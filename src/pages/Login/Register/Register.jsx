import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
   const [passwordError, setPasswordError] = useState("");
   const [loader, setLoader] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const handleRegister = (data, event) => {
      setPasswordError("");
      setLoader(true);
      const form = event.target;
      const fullName = data.firstName + " " + data.lastName;
      /* send the uploaded image to the server */
      const profileImg = data.profilePic[0];
      const formData = new FormData();
      formData.append("image", profileImg);
      if (data.password !== data.confirmPass) {
         setPasswordError("Password doesn't match!");
         setLoader(false);
         return;
      }
   };

   return (
      <div className="w-[85%] md:w-[50%] xl:w-[33%] mx-auto border border-primary rounded-md p-7 my-16">
         <h1 className="text-4xl mb-4 text-center font-bold">Register</h1>
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
                  <span className="label-text">Password</span>
               </label>
               <input
                  type="password"
                  placeholder="Password"
                  className={`input input-bordered ${
                     (errors?.password || passwordError) && "input-error"
                  }`}
                  {...register("password", {
                     required: "Password is required",
                     minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                     },
                  })}
               />
               <p className="text-red-500">{errors.password?.message || passwordError}</p>
            </div>

            <div className="form-control">
               <label className="label">
                  <span className="label-text">Confirm Password</span>
               </label>
               <input
                  type="password"
                  placeholder="Password"
                  className={`input input-bordered ${
                     (errors?.confirmPass || passwordError) && "input-error"
                  }`}
                  {...register("confirmPass", { required: "Password is required" })}
               />
               <p className="text-red-500">{errors.confirmPass?.message || passwordError}</p>
            </div>

            <button className="btn btn-primary w-full">
               {/* {loader ? <SmallSpinner /> : "Register"} */}
               Register
            </button>
         </form>
         <p className="text-center my-3">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary">
               Login
            </Link>
         </p>
      </div>
   );
};

export default Register;
