import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login/Login/Login";
import Register from "../pages/Login/Register/Register";
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
            path: "/login",
            element: <Login />,
         },
         {
            path: "/",
            element: <Register />,
         },
      ],
   },
]);
