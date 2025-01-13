import { AiOutlineClose } from "react-icons/ai";
import {
  AiOutlineCheckCircle,
  AiOutlineExclamationCircle,
  AiOutlineInfoCircle,
  AiOutlineWarning,
} from "react-icons/ai";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
  positionClasses: string;
  style?: any;
}

const Toast = ({
  message,
  type,
  onClose,
  positionClasses,
  style,
}: ToastProps) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          className: "bg-green-500 text-white",
          icon: <AiOutlineCheckCircle className="mr-2" />,
        };
      case "error":
        return {
          className: "bg-red-500 text-white",
          icon: <AiOutlineExclamationCircle className="mr-2" />,
        };
      case "info":
        return {
          className: "bg-blue-500 text-white",
          icon: <AiOutlineInfoCircle className="mr-2" />,
        };
      case "warning":
        return {
          className: "bg-yellow-500 text-white",
          icon: <AiOutlineWarning className="mr-2" />,
        };
      default:
        return { className: "", icon: null };
    }
  };

  const { className, icon } = getTypeStyles();

  return (
    <div
      style={style || {}}
      className={`fixed mx-auto p-4 rounded shadow-lg ${className} ${positionClasses}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {icon}
          <span>{message}</span>
        </div>
        <button onClick={onClose} className="ml-4 text-white">
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
};

export default Toast;
