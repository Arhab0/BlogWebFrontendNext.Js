import React from "react";

export const FirstDiv = () => {
  return (
    <div className="relative overflow-x-auto rounded-2xl shadow-xl text-nowrap">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-s text-gray-700 bg-white ">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Father Name
            </th>
            <th scope="col" className="px-6 py-3">
              CNIC
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Brief Profile
            </th>
            <th scope="col" className="px-6 py-3">
              Performance
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b ">
            
            <td className="px-6 py-4">Kazim Hussain</td>
            <td className="px-6 py-4">Muhammad Hassan</td>
            <td className="px-6 py-4">42501-0358487-6</td>
            <td className="px-6 py-4">kazimhussain@gmail.com</td>
            <td className="px-6 py-4">Mathematician</td>
            <td className="px-6 py-4"><div className="bg-green-500 rounded-full h-[20px] w-[20px]"/></td>
          </tr>
          
        </tbody>
      </table>
    </div>
  );
};

export default FirstDiv;
