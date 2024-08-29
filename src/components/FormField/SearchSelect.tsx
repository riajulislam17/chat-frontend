import React from "react";
import Select from "react-select";

interface OptionType {
  value: string | number;
  label: string;
}

interface SelectInputProps {
  placeholder: string;
  name: string;
  title: string;
  isLoading: boolean;
  options: OptionType[];
  isMulti?: boolean;
  noOptionsMessage?: string;
  initialOptions?: { value: string; label: string }[];
  onChange: any;
  required: boolean;
  disabled?: boolean;
  onInputChange?: (inputValue: string) => void;
}

const SearchSelect: React.FC<SelectInputProps> = ({
  placeholder,
  isLoading,
  name,
  title,
  options,
  isMulti = false,
  noOptionsMessage,
  onChange,
  required,
  disabled,
  onInputChange,
}) => {
  return (
    <div className="mb-6">
      <label
        className="block text-gray-700 text-sm font-semibold mb-4"
        htmlFor={name}
      >
        {title}
        {required && <span className="text-red-500">*</span>}
      </label>
      <Select
        isLoading={isLoading}
        isClearable
        isSearchable
        placeholder={placeholder}
        required={required}
        isDisabled={disabled}
        onChange={(value: any) => {
          onChange(value);
        }}
        onInputChange={onInputChange}
        options={options}
        isMulti={isMulti}
        noOptionsMessage={() => noOptionsMessage || "No options found"}
        className="pb-2"
      />
    </div>
  );
};

export default SearchSelect;
