import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import SmallSpinner from "../SmallSpinner/SmallSpinner";

const UpdateModal = ({ user, setCurrentUser, refetch }) => {
   const [loader, setLoader] = useState(false);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const handleUpdate = (data) => {
      setLoader(true);

      const updatedUser = {
         User: {
            profilePic: user.User.profilePic,
            name: data.name,
         },
         Email: data.email,
         Role: data.role,
         Plan: data.plan,
         Status: data.status,
      };

      axios
         .post(`http://localhost:5000/updateUser/${user._id}`, updatedUser)
         .then((response) => {
            if (response.data.modifiedCount > 0) {
               setLoader(false);
               toast.success("User Updated Successfully");
               refetch();
               setCurrentUser(null);
            }
         })
         .catch((error) => {
            setLoader(false);
            console.log(error);
         });
   };
   return (
      <div>
         <input type="checkbox" id="updateModal" className="modal-toggle" />
         <div className="modal">
            <div className="modal-box">
               <form onSubmit={handleSubmit(handleUpdate)} className="">
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">User Name</span>
                     </label>
                     <input
                        type="text"
                        defaultValue={user.User.name}
                        className={`input input-bordered ${errors?.name && "input-error"}`}
                        {...register("name", { required: "Name is required" })}
                     />
                     <p className="text-red-500">{errors.name?.message}</p>
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input
                        type="email"
                        defaultValue={user.Email}
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
                        defaultValue={user.Role}
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
                        defaultValue={user.Plan}
                        className="select select-bordered w-full"
                        {...register("plan")}
                     >
                        <option>Company</option>
                        <option>Enterprise</option>
                        <option>Team</option>
                     </select>
                  </div>

                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Status</span>
                     </label>
                     <select
                        defaultValue={user.Status}
                        className="select select-bordered w-full"
                        {...register("status")}
                     >
                        <option>Active</option>
                        <option>Inactive</option>
                        <option>Pending</option>
                     </select>
                  </div>

                  <div className="modal-action flex gap-2">
                     <button type="submit" htmlFor="updateModal" className="btn btn-primary  mt-3">
                        {loader ? <SmallSpinner /> : "Update User"}
                     </button>
                     <label
                        onClick={() => setCurrentUser(null)}
                        htmlFor="updateModal"
                        className="btn btn-secondary  mt-3"
                     >
                        Cancel
                     </label>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default UpdateModal;
