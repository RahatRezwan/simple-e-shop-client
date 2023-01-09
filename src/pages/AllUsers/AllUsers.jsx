import { useQuery } from "@tanstack/react-query";
import React from "react";
import exportIcon from "../../assets/icons/exportIcon.svg";
import threedot from "../../assets/icons/threedot.svg";
const AllUsers = () => {
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
                     SHOW/HIDE COLUMN
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
            <div className="overflow-x-auto relative">
               <table className="table-normal w-full overflow-y-auto">
                  {/* <!-- head --> */}
                  <thead className="bg-[#F4F5FA] sticky top-0 z-10">
                     <tr>
                        <th className="text-start">User</th>
                        <th className="text-start">Email</th>
                        <th className="text-start">Role</th>
                        <th className="text-start">Plan</th>
                        <th className="text-start">Status</th>
                        <th className="text-start">Action</th>
                     </tr>
                  </thead>
                  <tbody>
                     {users.map((user) => (
                        <tr className="table-row hover" key={user._id}>
                           <td className="flex items-center gap-3">
                              <img
                                 src={user.profilePic}
                                 alt=""
                                 className="w-10 h-10 rounded-full"
                              />
                              <div className="flex flex-col">
                                 <p>{user.name}</p>
                                 <small className="text-gray-400">@{user.name.split(" ")[0]}</small>
                              </div>
                           </td>
                           <td>{user.email}</td>
                           <td className="capitalize">{user.role}</td>
                           <td>{user.plan}</td>
                           <td>{user.status}</td>
                           <td>
                              <div className="dropdown dropdown-end">
                                 <label tabIndex={0} className="flex justify-center items-center">
                                    <img src={threedot} alt="" />
                                 </label>
                                 <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                                 >
                                    <li>
                                       <button>Edit</button>
                                    </li>
                                    <li>
                                       <button>Delete</button>
                                    </li>
                                 </ul>
                              </div>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default AllUsers;
