import React from "react";
import { twMerge } from "tailwind-merge";

interface SearchInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  containerClassName?: string; // Renamed for clarity
  className?: string; // This will be for the input
  icon?: React.ReactNode;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  containerClassName = "",
  className = "",
  icon,
}: SearchInputProps) => {
  return (
    <div className={twMerge(`relative ${containerClassName}`)}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={twMerge(
          `${
            icon ? "pl-10 " : ""
          } block w-full p-2  border border-gray-300 rounded-md  `,
          className
        )}
      />
      {icon && <div className="absolute left-3 top-2.5">{icon}</div>}
    </div>
  );
};

export default SearchInput;
