import React, { useContext } from "react";
import { Link } from "react-router-dom";
import darkMode from "../../assets/icons/darkMode.svg";
import notification from "../../assets/icons/notification.svg";
import { AuthContext } from "../../context/AuthProvider";

const AdminNavbar = () => {
   const { logoutAUser, user } = useContext(AuthContext);
   return (
      <nav className="flex justify-end items-center gap-4 py-2 px-4 mb-6">
         <img src={darkMode} alt="" />
         <img src={notification} alt="" />
         <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
               <div className="w-8 rounded-full">
                  <img src={user?.photoURL} alt="" />
               </div>
            </label>
            <ul
               tabIndex={0}
               className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
               <li>
                  <Link to="/">Home</Link>
               </li>

               <li>
                  <button onClick={logoutAUser}>Logout</button>
               </li>
            </ul>
         </div>
      </nav>
   );
};

export default AdminNavbar;
