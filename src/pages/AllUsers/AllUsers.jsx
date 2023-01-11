import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import exportIcon from "../../assets/icons/exportIcon.svg";
import DataTable from "../../components/DataTable/DataTable";
import SmallSpinner from "../../components/SmallSpinner/SmallSpinner";
const AllUsers = () => {
   /* Load data using react/tanStack query */
   const { data: users = [], isLoading } = useQuery({
      queryKey: ["users"],
      queryFn: () =>
         fetch(`https://e-shop-server-six.vercel.app/users`, {}).then((res) => res.json()),
   });

   const [hiddenColumns, setHiddenColumns] = useState([]);

   const handleColumnToggle = (column) => {
      if (hiddenColumns.includes(column)) {
         setHiddenColumns(hiddenColumns.filter((c) => c !== column));
      } else {
         setHiddenColumns([...hiddenColumns, column]);
      }
   };

   console.log(hiddenColumns);
   const headers = ["User", "Email", "Role", "Plan", "Status"];

   return (
      <div className="px-5">
         <h1 className="text-4xl text-[#975EFE] mb-5">All Users</h1>
         <div className="bg-white w-full rounded shadow-md">
            <div className="p-5 flex justify-between">
               <div className="flex gap-6">
                  <button className="flex gap-2 items-center py-[7px] px-[22px] border rounded-md hover:shadow-md">
                     <img src={exportIcon} alt="" />
                     PDF
                  </button>
                  <button className="flex gap-2 items-center py-[7px] px-[22px] border rounded-md hover:shadow-md">
                     <img src={exportIcon} alt="" />
                     EXCEL
                  </button>
                  <button className="flex gap-2 items-center py-[7px] px-[22px] border rounded-md hover:shadow-md">
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
                  <button className="flex gap-2 items-center text-white bg-[#975EFE] py-[7px] px-[22px] border rounded-md hover:shadow-md">
                     ADD USER
                  </button>
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
               <DataTable headers={headers} users={users} hiddenColumns={hiddenColumns} />
            )}
         </div>
      </div>
   );
};

export default AllUsers;
