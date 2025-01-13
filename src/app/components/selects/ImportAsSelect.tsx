import { useState, useEffect } from "react";
import { FaBan, FaLock } from "react-icons/fa";
import { IoChevronDownSharp } from "react-icons/io5";
import { LuTableProperties } from "react-icons/lu";
import { Field } from "../../models/fieldModels";

interface Option {
  label: string;
  value: string;
  icon: JSX.Element;
}

interface ImportAsSelectProps {
  header: string;
  fields: Field[];
  value: string | null;
  onChange: (value: string) => void;
}

export const ImportAsSelect = ({
  header,
  fields,
  value,
  onChange,
}: ImportAsSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(value);
  const [category, setCategory] = useState<string | null>(null);

  const options: Option[] = [
    { label: "Properties", value: "properties", icon: <LuTableProperties /> },
    { label: "Association", value: "association", icon: <FaLock /> },
    { label: "Don't import", value: "dont_import", icon: <FaBan /> },
  ];

  useEffect(() => {
    const matchingField = fields.find(
      (field) =>
        field.name === header ||
        (field.similarHeaders &&
          field.similarHeaders.includes(header.toLocaleLowerCase()))
    );

    if (matchingField) {
      const initialOption =
        matchingField.subcategory === "unique" ? "association" : "properties";
      setSelectedOption(initialOption);
      setCategory(matchingField.subcategory || null);
      onChange(initialOption);
    } else {
      setSelectedOption(null);
      setCategory(null);
      onChange("");
    }
  }, []);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  const handleSelect = (optionValue: string) => {
    setSelectedOption(optionValue);
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[200px]">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500 w-full text-left flex items-center justify-between"
      >
        {selectedOption
          ? options.find((option) => option.value === selectedOption)?.label
          : "Select an option"}
        <IoChevronDownSharp className="inline-block ml-2" />
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg w-full z-10">
          {options.map((option) => (
            <li key={option.value}>
              <div
                className={`flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                  option.value === "association" && category !== "unique"
                    ? "text-gray-300 cursor-not-allowed" // Visually indicate it's not selectable
                    : ""
                }`}
                onClick={() => {
                  if (option.value === "association" && category !== "unique") {
                    return; // Prevent selection if not valid
                  }
                  handleSelect(option.value);
                }}
              >
                <span className="mr-2">{option.icon}</span>
                {option.label}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
