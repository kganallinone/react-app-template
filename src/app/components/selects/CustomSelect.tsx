import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { PiPlus } from "react-icons/pi";
import { twMerge } from "tailwind-merge";
import { isExcludedCreateItemOption } from "../../utils/useOption";
import { useToast } from "../../context/ToastProvider";
import { BiCheck } from "react-icons/bi";

interface Option {
  _id: string;
  name: string;
}

interface CustomSelectProps {
  options: Option[];
  isMultiSelect: boolean;
  placeholder?: string;
  selected: Option[] | Option | null;
  onSelect: (selected: Option[] | Option | null) => void;
  iconArrowUp?: React.ReactNode;
  iconArrowDown?: React.ReactNode;
  className?: string;
}

const CustomSelect = ({
  options,
  isMultiSelect = false,
  placeholder = "Select an option",
  selected,
  onSelect,
  iconArrowUp,
  iconArrowDown,
  className,
}: CustomSelectProps) => {
  const { showToast } = useToast();
  const [open, setOpen] = useState(false);

  const handleSelect = (option: Option) => {
    if (isMultiSelect) {
      const selectedArray = Array.isArray(selected) ? selected : [];
      const isSelected = selectedArray.find((item) => item._id === option._id);

      const newSelected = isSelected
        ? selectedArray.filter((item) => item._id !== option._id)
        : [...selectedArray, option];

      onSelect(newSelected);
    } else {
      onSelect(option);
      setOpen(false);
    }
  };

  const isSelected = (option: Option) => {
    if (isMultiSelect && Array.isArray(selected)) {
      return selected.some((item) => item._id === option._id);
    }
    return selected && (selected as Option)._id === option._id;
  };

  return (
    <div className="relative w-full">
      <div
        className={twMerge(
          "border border-gray-300 p-2 rounded cursor-pointer flex justify-between items-center",
          open ? "border-blue-500" : "",
          className
        )}
        onClick={() => setOpen(!open)}
      >
        <span className="text-gray-500">
          {isMultiSelect
            ? placeholder
            : selected
            ? (selected as Option).name
            : placeholder}
        </span>
        <span className="text-gray-500">
          {open
            ? iconArrowUp || <IoIosArrowUp />
            : iconArrowDown || <IoIosArrowDown />}
        </span>
      </div>

      {open && (
        <ul className="absolute mt-1 border border-gray-300 bg-white rounded shadow-lg w-full max-h-60 overflow-auto z-10">
          {options.map((option) => (
            <>
              {!isExcludedCreateItemOption(option.name) ? (
                <li
                  key={option._id}
                  onClick={() => handleSelect(option)}
                  className={twMerge(
                    "p-2 cursor-pointer flex items-center justify-between gap-2",
                    isSelected(option)
                      ? "bg-green-100 hover:bg-green-200 text-green-700"
                      : "hover:bg-gray-100"
                  )}
                >
                  {option.name === "Start Datetime"
                    ? "Start Date and Time"
                    : option.name === "End Datetime"
                    ? "End Date and Time"
                    : option.name}{" "}
                  {isSelected(option) && <BiCheck />}
                </li>
              ) : null}
            </>
          ))}
          <li
            className="p-2  cursor-pointer "
            onClick={() =>
              showToast("Coming Soon...", "info", "bottom-10 right-10")
            }
          >
            <div className="flex items-center justify-center gap-2 border border-gray-300 p-2 rounded-full hover:bg-green-200 cursor-pointer">
              <PiPlus /> Add Field
            </div>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
