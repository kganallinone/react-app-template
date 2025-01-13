import { FaCircleCheck } from "react-icons/fa6";

type CircularCheckboxProps = {
  checked: boolean;
};

export const CircularCheckbox = ({ checked }: CircularCheckboxProps) => {
  return (
    <div className="relative inline-flex items-center">
      <span
        className={`w-8 h-8 rounded-full border-2 ${
          checked ? " border-green-500" : "bg-white border-gray-300"
        } flex items-center justify-center transition-colors duration-200`}
      >
        {checked ? (
          <div>
            <FaCircleCheck size={20} className="text-green-500" />
          </div>
        ) : (
          <div>
            <FaCircleCheck size={20} className="text-gray-200" />
          </div>
        )}
      </span>
    </div>
  );
};
