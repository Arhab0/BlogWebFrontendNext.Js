import React from "react";

function TableDivCopyTag() {
  return (
    <div className="bg-white">
      <div className="flex flex-row w-2/3">
        <div className="p-10 w-1/3">
          <label htmlFor="center" className="block text-gray-700 mb-2">
            Center#
          </label>
          <div className="relative">
            <input
              id="center"
              title="search"
              type="text"
              placeholder="Search..."
              className="text-black border border-gray-300 rounded-md px-4 py-2 w-full pr-10"
            />
            <button
              title="search"
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zm-1.4-6.32a6 6 0 1112 0 6 6 0 01-12 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-10 w-1/3">
          <label htmlFor="subject" className="block text-gray-700 mb-2">
            Subject
          </label>
          <div className="relative">
            <input
              id="subject"
              title="search"
              type="text"
              placeholder="Search..."
              className="text-black border border-gray-300 rounded-md px-4 py-2 w-full pr-10"
            />
            <button
              title="search"
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zm-1.4-6.32a6 6 0 1112 0 6 6 0 01-12 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-10 w-1/3">
          <label htmlFor="date" className="block text-gray-700 mb-2">
            Date
          </label>
          <div className="relative">
            <input
              id="date"
              title="search"
              type="text"
              placeholder="Search..."
              className="text-black border border-gray-300 rounded-md px-4 py-2 w-full pr-10"
            />
            <button
              title="search"
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zm-1.4-6.32a6 6 0 1112 0 6 6 0 01-12 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* <form className="max-w-md mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
          </div>
        </form> */}
      </div>
    </div>
  );
}

export default TableDivCopyTag;
