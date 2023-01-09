import React from "react";
import collapse from "../../assets/icons/collapse.svg";
import alluser from "../../assets/icons/alluser.svg";
import addUser from "../../assets/icons/addUser.svg";
import addProduct from "../../assets/icons/addProduct.svg";
import { Link } from "react-router-dom";

const SideBarCollapse = () => {
   return (
      <div className="flex flex-col justify-start gap-5 items-start min-h-screen">
         <label
            htmlFor="Sidebar"
            className="drawer-button cursor-pointer tooltip tooltip-right mb-5"
            data-tip="Expand"
         >
            <img src={collapse} alt="" className="rotate-180" />
         </label>

         <Link to="/admin/allUsers" className="tooltip tooltip-right" data-tip="All Users">
            <img src={alluser} alt="" />
         </Link>

         <Link to="/admin/addUser" className="tooltip tooltip-right" data-tip="Add Users">
            <img src={addUser} alt="" />
         </Link>
         <Link to="/admin/addProduct" className="tooltip tooltip-right" data-tip="Add Product">
            <img src={addProduct} alt="" />
         </Link>
      </div>
   );
};

export default SideBarCollapse;
