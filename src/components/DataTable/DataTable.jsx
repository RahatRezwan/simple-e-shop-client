import React from "react";

import threedot from "../../assets/icons/threedot.svg";

const DataTable = ({ headers, users, hiddenColumns, handleDeleteUser, setCurrentUser }) => {
   const tableDataStyle = "py-1 pl-5";
   return (
      <div className="overflow-x-auto overflow-y-auto relative">
         <table className="table-normal w-full ">
            {/* <!-- head --> */}
            <thead className="bg-[#F4F5FA] sticky top-0 z-10">
               <tr>
                  {headers.map((header, i) => (
                     <th
                        className="text-start"
                        key={i}
                        style={{ display: hiddenColumns.includes(header) ? "none" : "table-cell" }}
                     >
                        {header}
                     </th>
                  ))}
                  <th className="text-start">Action</th>
               </tr>
            </thead>
            <tbody>
               {users.map((user, i) => (
                  <tr className="table-row hover:bg-gray-100 border" key={user._id}>
                     {headers.map((header, j) => (
                        <>
                           {header === "User" ? (
                              <>
                                 <td
                                    key={j}
                                    className={`${tableDataStyle} flex items-center gap-3`}
                                    style={{ display: hiddenColumns.includes(header) && "none" }}
                                 >
                                    <img
                                       src={user[header].profilePic}
                                       alt=""
                                       className="w-[34px] h-[34px] rounded-full"
                                    />
                                    <div className="flex flex-col">
                                       <p className="text-sm">{user[header].name}</p>
                                       <small className="text-gray-400 text-xs">
                                          @{user[header].name.split(" ")[0]}
                                       </small>
                                    </div>
                                 </td>
                              </>
                           ) : (
                              <>
                                 <td style={{ display: hiddenColumns.includes(header) && "none" }}>
                                    {user[header]}
                                 </td>
                              </>
                           )}
                        </>
                     ))}

                     <td className={tableDataStyle}>
                        <div className="dropdown dropdown-end">
                           <label tabIndex={0} className="flex justify-center items-center">
                              <img src={threedot} alt="" />
                           </label>
                           <ul
                              tabIndex={0}
                              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                           >
                              <li>
                                 <label
                                    onClick={() => setCurrentUser(user)}
                                    htmlFor="updateModal"
                                    className=""
                                 >
                                    Edit
                                 </label>
                              </li>
                              <li>
                                 <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
                              </li>
                           </ul>
                        </div>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
};

export default DataTable;
