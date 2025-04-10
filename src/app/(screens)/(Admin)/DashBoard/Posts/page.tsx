// "use client";

// import Dropdown from "@/app/utils/components/Dropdown/Dropdown";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import useHelper from "../../../../../../Helper/helper";

// interface Records{
//   AuthorName:string;
//   postId:number;
//   postTitle:string;
//   postImg:string;
//   isApproved:string
// }

// const page = () => {
//   const helper = useHelper()
//   const router = useRouter();
//   const [options, setOptions] = useState([
//     { label: "🟢 Active", value: "Active" },
//     { label: "🔴 De-Activate", value: "DeActivated" },
//     { label: "Pending", value: "Pending" },
//     { label: "Rejected", value: "Rejected" },
//   ]);
//   const [selectedIssueStatusCriteria, setSelectedIssueStatusCriteria] = useState("")
  
//   const [searchEntry, setSearchEntry] = useState("");
//   const [result, setResult] = useState<Records[]>([]);
//   const [mappedData, setMappedData] = useState<Records[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10;
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = mappedData.slice(indexOfFirstPost, indexOfLastPost);

//   const totalPages = Math.ceil(mappedData.length / postsPerPage);

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };


//   useEffect(() => {
//     FetchData();
//   }, []);

//   useEffect(() => {
//     if (result.length > 0) {
//       SearchByKeyword();
//     }
//   }, [result, searchEntry, selectedIssueStatusCriteria]);

//   function SearchByKeyword() {
//     // setCurrentPage(1);

//     // // Filter the menus based on the search keyword
//     // let temp = [...result];
//     // if (selectedIssueStatusCriteria == "under") {
//     //   temp = temp.filter((x: Records) => {
//     //     return x.Issued < x.Enrollments;
//     //   });
//     // } else if (selectedIssueStatusCriteria == "over") {
//     //   temp = temp.filter((x: Records) => {
//     //     return x.Issued > x.Enrollments;
//     //   });
//     // }
//     // const filtered: Records[] = temp.filter((element) =>
//     //   Object.values(element).some((value) =>
//     //     String(value).toLowerCase().includes(searchEntry.toLowerCase())
//     //   )
//     // );

//     // setMappedData(filtered);
//   }

//   function FetchData(){}
//   return (
//     <div className="font-alata flex-1 h-full cursor-default">
//       <div className="flex justify-between items-center">
//         <h3 className="text-2xl font-alata mb-4">Flags</h3>
//         <p
//           className="text-themeColor cursor-pointer text-sm hover:underline"
//           onClick={() => router.back()}
//         >
//           Back
//         </p>
//       </div>

//       <div className="card_White">
//         <div className="flex gap-4 items-center">
//           <div className="w-full md:w-1/3">
//             <Dropdown
//               placeHolder="Filter by issues"
//               name="selectedRegion"
//               options={flag}
//               activeId={selectedFlag}
//               handleDropdownChange={(n, v: any) => {
//                 setCurrentPage(1);
//                 setSelectedFlag(v);
//               }}
//             />
//           </div>
//         </div>

//         <div className="text-nowrap">
//           <div className="w-full overflow-x-scroll">
//             <table className="min-w-full table-auto mt-4 text-sm text-nowrap">
//               <thead>
//                 <tr>
//                   <th className="text-left pr-2 py-1">Center #</th>
//                   <th className="text-left px-2 py-1">Center Name</th>
//                   <th className="text-left px-2 py-1">Address</th>
//                   <th className="text-left px-2 py-1">District</th>
//                   <th className="text-left px-2 py-1">Region</th>
//                   <th className="text-left px-2 py-1">Issue</th>
//                   <th className="text-left px-2 py-1">Quantity</th>
//                   <th className="text-left pl-2 py-1">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentPosts.map((e, i) => (
//                   <tr className="text-[#6A6A6A] text-xs" key={i}>
//                     <td className="pr-2 py-1">{e.CenterNo}</td>
//                     <td className="px-2 py-1">{e.CenterName}</td>
//                     <td className="px-2 py-1">{e.Address}</td>
//                     <td className="px-2 py-1">{e.District}</td>
//                     <td className="px-2 py-1">{e.Region}</td>
//                     <td
//                       className={`px-2 py-2 
//               ${e.Issue === "Missing Script" ? "text-[#E92222]" : ""}
//               ${e.Issue === "Overuse" ? "text-[#012E41]" : ""}
//               ${
//                 e.Issue === "Delays In Returning Completed"
//                   ? "text-[#049FBF]"
//                   : ""
//               }
//               ${
//                 e.Issue === "Delays In Returning Unused" ? "text-[#B4B4B4]" : ""
//               }`}
//                     >
//                       {e.Issue}
//                     </td>
//                     <td className="px-2 py-2">{e.Qunatity}</td>
//                     <td
//                       onClick={() =>
//                         router.push(
//                           `/Home/InventoryManagement/Flags/FlagInCenter?center=${e.CenterNo}`
//                         )
//                       }
//                       className="text-[#2159AD] cursor-pointer flex items-center gap-2 pl-2 py-2"
//                     >
//                       View Detail{" "}
//                       <Image src={Eye} height={8} width={12} alt="eye" />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           {currentPosts.length > 0 && (
//             <div className="flex md:items-end text-xs justify-between w-full md:flex-row flex-col items-center">
//               <div className="mt-5">
//                 showing {currentPosts.length} data out of {flagResult.length}
//               </div>
//               <div className="flex items-center justify-center mt-2">
//                 <button
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1}
//                   className="px-4 py-2 mr-4 bg-gray-200 rounded disabled:opacity-50"
//                 >
//                   <FaArrowLeft />
//                 </button>
//                 <span className="mr-4 font-bold">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages}
//                   className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
//                 >
//                   <FaArrowRight />
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;
