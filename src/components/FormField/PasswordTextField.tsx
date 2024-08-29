import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

interface PasswordTextFieldProps {
  placeholder: string;
  required: boolean;
  name: string;
  title: string;
  onChange: (value: string) => void;
  value: string;
  disabled?: boolean;
}

const PasswordTextField: React.FC<PasswordTextFieldProps> = ({
  placeholder,
  required,
  name,
  title,
  onChange,
  value,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-6">
      <label
        className="block text-gray-700 text-sm font-semibold mb-4"
        htmlFor={name}
      >
        {title}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          name={name}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          value={value}
          type={showPassword ? "text" : "password"}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 px-3 py-2 w-full rounded"
          autoComplete="off"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
        >
          {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
        </button>
      </div>
    </div>
  );
};

export default PasswordTextField;
