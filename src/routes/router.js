import { createBrowserRouter } from "react-router-dom";
import AdminPanel from "../layouts/AdminPanel";
import Main from "../layouts/Main";
import AddProduct from "../pages/AddProduct/AddProduct";
import AddUser from "../pages/AddUser/AddUser";
import AllUsers from "../pages/AllUsers/AllUsers";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Login/Register/Register";
import MyCart from "../pages/MyCart/MyCart";
import Shop from "../pages/Shop/Shop";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main />,
      children: [
         {
            path: "/",
            element: <Shop />,
         },
         {
            path: "/myCart",
            element: (
               <PrivateRoutes>
                  <MyCart />
               </PrivateRoutes>
            ),
         },

         {
            path: "/login",
            element: <Login />,
         },
         {
            path: "/register",
            element: <Register />,
         },
      ],
   },
   {
      path: "/admin",
      element: (
         <PrivateRoutes>
            <AdminPanel />
         </PrivateRoutes>
      ),
      children: [
         {
            path: "/admin",
            element: <AllUsers />,
         },
         {
            path: "/admin/allUsers",
            element: <AllUsers />,
         },
         {
            path: "/admin/addUser",
            element: <AddUser />,
         },
         {
            path: "/admin/addProduct",
            element: <AddProduct />,
         },
      ],
   },
]);
