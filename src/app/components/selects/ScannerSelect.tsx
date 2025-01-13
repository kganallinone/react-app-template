import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import { twMerge } from "tailwind-merge";

interface ScannerOption {
  id: number;
  name: string;
  icon: React.ReactNode;
}

interface ScannerSelectProps {
  options: ScannerOption[];
  selected: ScannerOption | null;
  onSelect: (selected: ScannerOption | null) => void;
  placeholder?: string;
  iconArrowUp?: React.ReactNode;
  iconArrowDown?: React.ReactNode;
  className?: string;
}

export const ScannerSelect = ({
  options,
  selected,
  onSelect,
  placeholder = "Select scanner",
  className,
}: ScannerSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: ScannerOption) => {
    onSelect(option);
    setOpen(false);
  };

  const isSelected = (option: ScannerOption) =>
    selected && selected.id === option.id;

  return (
    <div className="relative ">
      <div
        className={twMerge(
          "border border-transparent p-2 rounded cursor-pointer flex justify-between items-center w-fit",
          open ? "border-transparent" : "",
          className
        )}
        onClick={() => setOpen(!open)}
      >
        <span className="flex items-center text-gray-500">
          {selected ? selected.icon : null}
          <span className="ml-2">{selected ? selected.name : placeholder}</span>
        </span>
        <span className="text-gray-500">
          {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </div>

      {open && (
        <ul className="absolute mt-1 border border-gray-300 bg-white rounded shadow-lg  max-h-72 overflow-auto z-10 w-fit">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className={twMerge(
                "p-2 cursor-pointer flex items-center justify-between gap-2",
                isSelected(option)
                  ? "bg-green-100 hover:bg-green-200 text-green-700"
                  : "hover:bg-gray-100"
              )}
            >
              <span className="flex items-center justify-center w-full">
                <div className="">
                  {option.icon}
                  <span className="text-xs text-gray-500">{option.name}</span>
                </div>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
