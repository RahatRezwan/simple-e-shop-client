import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import SideBarCollapse from "../components/SideBarCollapse/SideBarCollapse";
import SideBarExpand from "../components/SideBarExpand/SideBarExpand";

const AdminPanel = () => {
   const [collapse, setCollapse] = useState(true);
   return (
      <div className="drawer bg-[#F4F5FA]">
         <input
            id="Sidebar"
            type="checkbox"
            className="drawer-toggle"
            onChange={() => setCollapse(!collapse)}
         />
         <div className="drawer-content flex">
            {/* <!-- Page content here --> */}
            <div className={collapse ? "w-[10%] p-5" : "w-[20%] p-5"}>
               <SideBarCollapse />
            </div>
            <div className="w-[90%]">
               <AdminNavbar />
               <Outlet />
            </div>
         </div>
         <div className="drawer-side">
            <label htmlFor="Sidebar" className="drawer-overlay"></label>

            <ul className="menu p-4 w-[260px] bg-[#F4F5FA] text-base-content">
               {/* <!-- Sidebar content here --> */}
               <SideBarExpand />
            </ul>
         </div>
      </div>
   );
};

export default AdminPanel;
