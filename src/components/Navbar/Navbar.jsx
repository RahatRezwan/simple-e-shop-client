import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
   const { user, logoutAUser } = useContext(AuthContext);
   const menuItems = [
      { id: 1, menu: "Shop", link: "/" },
      { id: 2, menu: "MyCart", link: "/myCart" },
      { id: 3, menu: "Login", link: "/login" },
   ];
   const loginMenuItems = [
      { id: 3, menu: "Admin", link: "/admin" },
      { id: 1, menu: "Shop", link: "/" },
      { id: 2, menu: "MyCart", link: "/myCart" },
   ];

   const menus = user?.uid ? loginMenuItems : menuItems;
   return (
      <div>
         <nav className="navbar bg-base-100">
            <div className="flex-1">
               <Link className="btn btn-ghost normal-case text-xl">KaziRahat</Link>
            </div>

            <div className="flex-none gap-2">
               <div className="form-control hidden md:block">
                  <input type="text" placeholder="Search" className="input input-bordered" />
               </div>
               <ul className="hidden lg:flex items-center">
                  {menus.map((item) => (
                     <li key={item.id} className="btn btn-ghost">
                        <Link to={item.link && item.link}>{item.menu}</Link>
                     </li>
                  ))}
                  {user?.uid && (
                     <li>
                        <button onClick={logoutAUser} className="btn btn-ghost">
                           Logout
                        </button>
                     </li>
                  )}
               </ul>
            </div>

            {/* Mobile Menu */}
            <div className="dropdown dropdown-end block lg:hidden">
               <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h7"
                     />
                  </svg>
               </label>
               <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
               >
                  {menus.map((item) => (
                     <li key={item.id}>
                        <Link to={item.link && item.link}>{item.menu}</Link>
                     </li>
                  ))}
                  {user?.uid && (
                     <li>
                        <button onClick={logoutAUser}>Logout</button>
                     </li>
                  )}
               </ul>
            </div>
         </nav>
      </div>
   );
};

export default Navbar;
