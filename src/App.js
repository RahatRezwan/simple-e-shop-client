import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./routes/router";

const CloseButton = ({ closeToast }) => (
   <button className="btn btn-primary btn-outline" onClick={closeToast}>
      Ok
   </button>
);

const App = () => {
   return (
      <div>
         <RouterProvider router={router} />
         <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="dark"
            closeButton={CloseButton}
         />
      </div>
   );
};

export default App;
