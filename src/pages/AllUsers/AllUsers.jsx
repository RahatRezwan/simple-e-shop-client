import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import exportIcon from "../../assets/icons/exportIcon.svg";
import DataTable from "../../components/DataTable/DataTable";
import SmallSpinner from "../../components/SmallSpinner/SmallSpinner";
import UpdateModal from "../../components/UpdateModal/UpdateModal";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AllUsers = () => {
   const [currentUser, setCurrentUser] = useState(null);
   /* Load data using react/tanStack query */
   const {
      data: users = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["users"],
      queryFn: () =>
         fetch(`https://e-shop-server-six.vercel.app/users`, {}).then((res) => res.json()),
   });

   const userData = users.map(({ User: { name }, Email, Role, Plan }) => ({
      name,
      Email,
      Role,
      Plan,
   }));
   const column = [
      { title: "Name", dataKey: "name" },
      { title: "Email", dataKey: "Email" },
      { title: "Role", dataKey: "Role" },
      { title: "Plan", dataKey: "Plan" },
   ];

   function exportPdf() {
      const doc = new jsPDF();
      doc.text("All Users Data", 10, 10);
      doc.autoTable({
         head: [column.map((col) => col.title)],
         body: userData.map((row) => [row.name, row.Email, row.Role, row.Plan]),
      });
      doc.save("userData.pdf");
   }

   /* const exportToExcel = () => {
      const ws = XLSX.utils.json_to_sheet(userData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "User.xlsx");
   }; */

   const [hiddenColumns, setHiddenColumns] = useState([]);
   const headers = ["User", "Email", "Role", "Plan", "Status"];

   const handleColumnToggle = (column) => {
      if (hiddenColumns.includes(column)) {
         setHiddenColumns(hiddenColumns.filter((c) => c !== column));
      } else {
         setHiddenColumns([...hiddenColumns, column]);
      }
   };

   const handleDeleteUser = (_id) => {
      axios.delete(`https://e-shop-server-six.vercel.app/deleteUser/${_id}`).then((response) => {
         if (response.data.deletedCount > 0) {
            toast.success("Deleted Successfully");
            refetch();
         }
      });
   };

   return (
      <div className="px-5">
         <h1 className="text-4xl text-[#975EFE] mb-5">All Users</h1>
         <div className="bg-white w-full rounded shadow-md">
            {/* all buttons of all user table */}
            <div className="p-5 flex justify-between">
               <div className="flex gap-6">
                  <button
                     onClick={exportPdf}
                     className="flex gap-2 items-center py-[7px] px-[22px] border rounded-md hover:shadow-md"
                  >
                     <img src={exportIcon} alt="" />
                     PDF
                  </button>
                  <button className="flex gap-2 items-center py-[7px] px-[22px] border rounded-md hover:shadow-md">
                     <img src={exportIcon} alt="" />
                     EXCEL
                  </button>
                  <button
                     onClick={exportPdf}
                     className="flex gap-2 items-center py-[7px] px-[22px] border rounded-md hover:shadow-md"
                  >
                     <img src={exportIcon} alt="" />
                     PRINT
                  </button>
                  <button className="flex gap-2 items-center py-[7px] px-[22px] border rounded-md hover:shadow-md">
                     <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="flex justify-center items-center">
                           SHOW/HIDE COLUMN
                        </label>
                        <ul
                           tabIndex={0}
                           className="dropdown-content menu p-2 shadow bg-base-100 rounded-box mt-3"
                        >
                           {headers.map((header, i) => (
                              <li
                                 key={i}
                                 className="flex flex-row-reverse gap-2 justify-start items-center"
                              >
                                 <label>{header}</label>
                                 <input
                                    type="checkbox"
                                    checked={!hiddenColumns.includes(header)}
                                    onChange={() => handleColumnToggle(header)}
                                 />
                              </li>
                           ))}
                        </ul>
                     </div>
                  </button>
               </div>
               <div className="flex gap-6">
                  <input
                     type="text"
                     placeholder="Search Invoice"
                     className="flex gap-2 items-center py-[7px] px-[22px] border rounded-md"
                  />
                  <Link
                     to="/admin/addUser"
                     className="flex gap-2 items-center text-white bg-[#975EFE] py-[7px] px-[22px] border rounded-md hover:shadow-md"
                  >
                     ADD USER
                  </Link>
               </div>
            </div>

            {/* table */}
            {isLoading ? (
               <>
                  <div className="w-full h-full flex justify-center items-center">
                     <SmallSpinner />
                  </div>
               </>
            ) : (
               <DataTable
                  headers={headers}
                  users={users}
                  hiddenColumns={hiddenColumns}
                  handleDeleteUser={handleDeleteUser}
                  setCurrentUser={setCurrentUser}
               />
            )}
         </div>

         {currentUser && (
            <UpdateModal user={currentUser} setCurrentUser={setCurrentUser} refetch={refetch} />
         )}
      </div>
   );
};

export default AllUsers;
