import React from "react";

const SearchBar: React.FC = () => {
  return (
    <input
      className="border border-gray-300 w-full py-2 px-3 rounded-sm"
      type="text"
      placeholder="Search with User Email"
      // onChange={(e) => setSearchText(e.target.value)}
    />
  );
};

export default SearchBar;
