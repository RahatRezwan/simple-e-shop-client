import React from "react";
import { Link } from "react-router-dom";

const menuItems = [
   { id: 1, menu: "Shop", link: "/" },
   { id: 1, menu: "MyCart", link: "/myCart" },
   { id: 1, menu: "Dashboard", link: "/dashboard" },
];

const Navbar = () => {
   return (
      <div>
         <nav className="navbar bg-base-100">
            <div className="flex-1">
               <Link className="btn btn-ghost normal-case text-xl">KaziRahat</Link>
            </div>

            <div className="flex-none gap-2">
               <div className="form-control">
                  <input type="text" placeholder="Search" className="input input-bordered" />
               </div>
               <ul className="flex items-center">
                  {menuItems.map((item) => (
                     <li key={item.id} className="btn btn-ghost">
                        <Link to={item.link}>{item.menu}</Link>
                     </li>
                  ))}
                  <li className="btn btn-ghost">
                     <Link to="/login">Login</Link>
                  </li>
                  <li className="btn btn-ghost">
                     <Link>Logout</Link>
                  </li>
               </ul>
            </div>

            {/* Mobile Menu */}
            <div className="dropdown dropdown-end">
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
                  {menuItems.map((item) => (
                     <li key={item.id}>
                        <Link to={item.link}>{item.menu}</Link>
                     </li>
                  ))}
                  <li>
                     <Link to="/login">Login</Link>
                  </li>
                  <li>
                     <Link>Logout</Link>
                  </li>
               </ul>
            </div>
         </nav>
      </div>
   );
};

export default Navbar;
