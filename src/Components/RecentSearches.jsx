import React from "react";

function RecentSearches({ recentHistory, onHistoryClick, onClearHistory }) {
  return (
    <div className="col-span-1 flex flex-col justify-between bg-gray-100 dark:bg-zinc-800 transition-colors duration-300">
      <div>
        <h1 className="text-xl flex justify-center pt-3 text-black dark:text-white">
          <span>Recent Searches</span>
          <button onClick={onClearHistory} className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
            </svg>
          </button>
        </h1>

        <ul className="mt-2 max-h-[75vh] overflow-y-auto text-left scrollbar-hide">
          {recentHistory?.map((item, index) => (
            <li
              key={index}
              onClick={() => onHistoryClick(item)}
              className="p-1 pl-5 text-zinc-700 dark:text-zinc-300 cursor-pointer truncate hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-zinc-100 transition-colors"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
}

export default RecentSearches;
