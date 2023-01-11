import React from "react";
import { Link } from "react-router-dom";
import collapse from "../../assets/icons/collapse.svg";
import alluser from "../../assets/icons/alluser.svg";
import addUser from "../../assets/icons/addUser.svg";
import addProduct from "../../assets/icons/addProduct.svg";

const SideBarExpand = () => {
   return (
      <>
         <div className="flex justify-between items-center mb-5">
            <Link to="/" className="text-md font-bold">
               KaziRahat
            </Link>
            <label
               htmlFor="Sidebar"
               className="drawer-button cursor-pointer tooltip tooltip-bottom"
               data-tip="collapse"
            >
               <img src={collapse} alt="" className="" />
            </label>
         </div>
         <Link className=""></Link>
         <div tabIndex={0} className="collapse collapse-arrow">
            <div className="collapse-title flex items-center gap-2">
               <img src={alluser} alt="" />
               All Users
            </div>
            <div className="w-full collapse-content text-end">
               <li className="cursor-pointer">Users Sub Menu-1</li>
               <li className="cursor-pointer">Users Sub Menu-2</li>
            </div>
         </div>
         <Link to="/admin/addUser" className="collapse-title flex items-center gap-2">
            <img src={addUser} alt="" />
            Add User
         </Link>
         <Link to="/admin/addProduct" className="collapse-title flex items-center gap-2">
            <img src={addProduct} alt="" />
            Add Product
         </Link>
      </>
   );
};

export default SideBarExpand;
