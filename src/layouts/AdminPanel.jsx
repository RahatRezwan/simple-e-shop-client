import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBarCollapse from "../components/SideBarCollapse/SideBarCollapse";
import SideBarExpand from "../components/SideBarExpand/SideBarExpand";

const AdminPanel = () => {
   const [collapse, setCollapse] = useState(true);
   return (
      <div className="drawer">
         <input
            id="Sidebar"
            type="checkbox"
            className="drawer-toggle"
            onChange={() => setCollapse(!collapse)}
         />
         <div className="drawer-content grid grid-cols-2">
            {/* <!-- Page content here --> */}
            <div className="w-[10%] p-5">
               <div className={collapse || "w-[260px]"} />
               <SideBarCollapse />
            </div>
            <Outlet />
         </div>
         <div className="drawer-side">
            <label htmlFor="Sidebar" className="drawer-overlay"></label>

            <ul className="menu p-4 w-[260px] bg-base-100 text-base-content">
               {/* <!-- Sidebar content here --> */}
               <SideBarExpand />
            </ul>
         </div>
      </div>
   );
};

export default AdminPanel;
