import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SmallSpinner from "../../../components/SmallSpinner/SmallSpinner";
import { AuthContext } from "../../../context/AuthProvider";

const Register = () => {
   const { createAUser, updateAUser } = useContext(AuthContext);
   const [passwordError, setPasswordError] = useState("");
   const [loader, setLoader] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const navigate = useNavigate();
   const imgHostKey = process.env.REACT_APP_imgbb_key;

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

      /* Host Image to imgBB */
      axios
         .post(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, formData)
         .then((imgResponse) => {
            const user = {
               profilePic: imgResponse.data.data.url,
               name: fullName,
               email: data.email,
            };

            /* Crete a user */
            createAUser(data.email, data.password)
               .then((result) => {
                  /* update a user info */
                  updateAUser(user.name, user.profilePic)
                     .then(() => {
                        /* save user to db */
                        axios
                           .post("https://e-shop-server-six.vercel.app/users", user)
                           .then((response) => {
                              if (response.data.acknowledged) {
                                 setLoader(false);
                                 form.reset();
                                 toast.success("Account Created Successfully");
                                 navigate("/");
                              }
                           })
                           .catch((error) => {
                              setLoader(false);
                              console.log(error);
                           });
                     })
                     .catch((error) => {
                        setLoader(false);
                        toast.error(error.code.slice(5));
                     });
               })
               .catch((error) => {
                  setLoader(false);
                  toast.error(error.code.slice(5));
               });
         })
         .catch((error) => {
            setLoader(false);
            toast.error(error);
         });
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
               {loader ? <SmallSpinner /> : "Register"}
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
