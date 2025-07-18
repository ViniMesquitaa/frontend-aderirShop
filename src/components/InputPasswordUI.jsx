import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputPasswordUI = ({ label, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-1">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-1 md:flex items-center"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
        />
        <button
          type="button"
          className="absolute right-3 top-5 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <FaEyeSlash className="w-10" />
          ) : (
            <FaEye className="w-10" />
          )}
        </button>
      </div>
    </div>
  );
};

export default InputPasswordUI;
