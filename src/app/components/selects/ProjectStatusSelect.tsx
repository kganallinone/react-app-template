import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { ProjectStatusType } from "../../type/ProjectStatusOptionType";

interface SelectProps {
  options: ProjectStatusType[];
  isMultiSelect?: boolean;
  placeholder?: string;
  selected: ProjectStatusType[] | ProjectStatusType | null;
  onSelect: (selected: ProjectStatusType[] | ProjectStatusType | null) => void;
  iconArrowUp?: React.ReactNode;
  iconArrowDown?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

const ProjectStatusSelect = ({
  options,
  isMultiSelect = false,
  placeholder = "Select an option",
  selected,
  onSelect,
  iconArrowUp,
  iconArrowDown,
  className,
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (option: ProjectStatusType) => {
    if (isMultiSelect) {
      if (Array.isArray(selected)) {
        const isSelected = selected.find((item) => item.id === option.id);
        const newSelected = isSelected
          ? selected.filter((item) => item.id !== option.id)
          : [...selected, option];
        onSelect(newSelected);
      } else {
        onSelect([option]);
      }
    } else {
      onSelect(option);
      setOpen(false);
    }
  };

  const isSelected = (option: ProjectStatusType) => {
    return isMultiSelect
      ? Array.isArray(selected) &&
          selected.some((item) => item.id === option.id)
      : selected && (selected as ProjectStatusType).id === option.id;
  };

  return (
    <div className="relative w-full">
      <div
        className={twMerge(
          "border border-gray-300 p-2 rounded cursor-pointer flex justify-between items-center",
          open ? "border-blue-500" : "" + " " + className
        )}
        onClick={() => setOpen(!open)}
      >
        <span className="text-gray-500">
          {isMultiSelect
            ? Array.isArray(selected) && selected.length > 0
              ? selected.map((item) => item.title).join(", ")
              : placeholder
            : selected
            ? (selected as ProjectStatusType).title
            : placeholder}
        </span>
        <span className="text-gray-500">
          {open ? (
            iconArrowUp ? (
              iconArrowUp
            ) : (
              <IoIosArrowUp />
            )
          ) : iconArrowDown ? (
            iconArrowDown
          ) : (
            <IoIosArrowDown />
          )}
        </span>
      </div>

      {open && (
        <ul className="absolute mt-1 border border-gray-300 bg-white rounded shadow-lg w-full max-h-60 overflow-auto z-10">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className={twMerge(
                "p-2 cursor-pointer hover:bg-gray-100",
                isSelected(option) ? "bg-blue-100" : ""
              )}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProjectStatusSelect;
