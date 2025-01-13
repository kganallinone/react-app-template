import { useState, useEffect, useRef } from "react";
import { Field } from "../../models/fieldModels";
import { IoChevronDownSharp } from "react-icons/io5";
import PropertyDescriptionTooltip from "../tooltips/PropertyDescriptionTooltip";
import { FaAsterisk, FaKey } from "react-icons/fa";
import { RiCodeFill } from "react-icons/ri";

interface SearchableSelectProps {
  header: string;
  options: Field[];
  selectedValue: string;
  onChange: (value: string) => void;
  selectedProperties: string[];
}

export const PropertiesSelect = ({
  header,
  options,
  selectedValue,
  onChange,
  selectedProperties,
}: SearchableSelectProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<{
    data: any;
    position: { top: number; left: number };
  } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedOptions = filteredOptions.reduce<Record<string, Field[]>>(
    (groups, option) => {
      if (option.category) {
        if (!groups[option.category]) groups[option.category] = [];
        groups[option.category].push(option);
      }
      return groups;
    },
    {}
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setTooltip(null); // Hide tooltip on outside click
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setTooltip(null); // Hide tooltip on escape
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setTooltip(null);
  };

  const dropdownPosition = () => {
    if (!isDropdownOpen || !selectRef.current) return "bottom";

    const { bottom } = selectRef.current.getBoundingClientRect();
    const dropdownHeight = 400;
    const viewportHeight = window.innerHeight;

    return bottom + dropdownHeight > viewportHeight ? "top" : "bottom";
  };

  const position = dropdownPosition();

  const displayValue = selectedValue
    ? options.find((opt) => opt.name === selectedValue)?.label ??
      "Choose a property"
    : options.find((option) =>
        option.similarHeaders?.some(
          (similarHeader) =>
            similarHeader.toLowerCase() === header.toLowerCase()
        )
      )?.label ?? "Choose a property";

  const handleMouseEnter = (option: Field) => {
    const rect = dropdownRef.current?.getBoundingClientRect();
    if (rect) {
      const tooltipPosition = {
        top: rect.top + window.scrollY + rect.height / 2, // Center tooltip vertically
        left: rect.left + window.scrollX - 10, // Position to the left with some spacing
      };

      // Ensure the tooltip does not go off-screen on the top
      if (tooltipPosition.top < 0) {
        tooltipPosition.top = rect.top + window.scrollY + rect.height + 10; // Move below if off-screen
      }

      // Ensure the tooltip does not go off-screen on the left
      if (tooltipPosition.left < 0) {
        tooltipPosition.left = rect.left + window.scrollX + rect.width + 10; // Move to the right if off-screen
      }

      setTooltip({
        data: option || {},
        position: tooltipPosition,
      });
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    // Check if the mouse has left the dropdown and tooltip
    const tooltipElement = document.querySelector(".tooltip-class"); // Update this selector
    const relatedTarget = event.relatedTarget as HTMLElement;

    // Check if the mouse is entering the tooltip or staying within the dropdown
    if (tooltipElement && !tooltipElement.contains(relatedTarget)) {
      setTooltip(null); // Hide tooltip if the mouse is not on the tooltip or dropdown
    }
  };

  return (
    <div className="relative">
      <div
        ref={selectRef}
        className="px-3 text-nowrap py-1 text-sm border border-gray-300 rounded cursor-pointer w-[170px] flex justify-between items-center"
        onClick={toggleDropdown}
      >
        {displayValue}
        <IoChevronDownSharp className="inline-block ml-2" />
      </div>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 w-full bg-white border border-gray-300 rounded mt-1 shadow-lg ${
            position === "top" ? "bottom-full mb-1" : "top-full mt-1"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-1 text-sm border-b border-gray-300 focus:outline-none"
          />
          <div className="max-h-48 overflow-y-auto text-left">
            {Object.keys(groupedOptions).length > 0 ? (
              Object.entries(groupedOptions).map(([category, options]) => (
                <div key={category}>
                  <div className="px-3 py-1 text-[18px] font-bold text-gray-700 bg-gray-100 ">
                    {category}
                  </div>
                  {options.map((option) => (
                    <div
                      key={option.name}
                      onClick={() => {
                        if (
                          option.name !== selectedValue &&
                          !selectedProperties.includes(option.name)
                        ) {
                          onChange(option.name);
                          setIsDropdownOpen(false);
                          setSearchTerm("");
                          setTooltip(null); // Close the tooltip when an option is selected
                        }
                      }}
                      onMouseEnter={() => handleMouseEnter(option)} // Show tooltip on hover
                      onMouseLeave={handleMouseLeave} // Hide tooltip on mouse leave
                      className={`px-3 py-1 text-sm cursor-pointer flex items-center gap-2 ${
                        selectedValue === option.name
                          ? "bg-green-200"
                          : selectedProperties.includes(option.name)
                          ? "text-gray-400 cursor-not-allowed"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      {option.subcategory === "unique" ? (
                        <FaKey />
                      ) : option.subcategory === "required" ? (
                        <FaAsterisk />
                      ) : (
                        <RiCodeFill />
                      )}{" "}
                      {option.label}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <div className="px-3 py-1 text-sm text-gray-500">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
      {tooltip && (
        <PropertyDescriptionTooltip
          data={tooltip.data}
          position={tooltip.position}
        />
      )}
    </div>
  );
};
