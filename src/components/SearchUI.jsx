import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchUI = () => {
  const [value, setValue] = useState("");

  return (
    <div className="relative w-full sm:w-60">
      <FiSearch className="absolute left-3 top-2 text-gray-400" size={23} />

      <label className="absolute left-10 top-2 text-gray-400 transition-all duration-200 "></label>

      <input
        type="text"
        className="w-full rounded-2xl border border-gray-300 bg-white py-2 pl-10 pr-4 shadow focus:border-blue-600 focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
export default SearchUI;
