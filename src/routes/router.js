import { createBrowserRouter } from "react-router-dom";
import AdminPanel from "../layouts/AdminPanel";
import Main from "../layouts/Main";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Login/Register/Register";
import MyCart from "../pages/MyCart/MyCart";
import Shop from "../pages/Shop/Shop";

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
            element: <MyCart />,
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
      element: <AdminPanel />,
   },
]);
