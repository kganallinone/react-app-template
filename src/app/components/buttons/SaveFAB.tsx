import { useState, useEffect } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// Define the props interface
interface SaveFABProps {
  onSave: () => void; // Function to call on save
  onCancel?: () => void; // Optional function to call on cancel
  saveLabel?: string; // Custom label for the save button
  cancelLabel?: string; // Custom label for the cancel button
  tooltipMessage?: string; // Custom tooltip message
}

export const SaveFAB: React.FC<SaveFABProps> = ({
  onSave,
  onCancel,
  saveLabel = "Save", // Default label
  cancelLabel = "Cancel", // Default label
  tooltipMessage = "Click this if you want to save your event", // Default tooltip message
}) => {
  const [showContainer, setShowContainer] = useState(false); // State to toggle the container
  const [showTooltip, setShowTooltip] = useState(false); // State for tooltip visibility

  const handleClick = () => {
    setShowContainer(!showContainer); // Toggle container visibility
  };

  useEffect(() => {
    const tooltipTimer = setInterval(() => {
      // Show tooltip every 10 seconds if not already showing
      if (!showTooltip) {
        setShowTooltip(true);
        // Hide tooltip after 10 seconds
        setTimeout(() => {
          setShowTooltip(false);
        }, 10000);
      }
    }, 10000);

    return () => clearInterval(tooltipTimer); // Clean up on component unmount
  }, [showTooltip]);

  const handleMouseEnter = () => {
    setShowTooltip(true); // Show tooltip on hover
  };

  const handleMouseLeave = () => {
    setShowTooltip(false); // Hide tooltip when not hovering
  };

  return (
    <div className="relative">
      <div className="fixed bottom-5 right-5 mb-4 mr-4 z-50">
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded-full flex items-center justify-between z-50"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter} // Show tooltip on hover
          onMouseLeave={handleMouseLeave} // Hide tooltip when not hovering
        >
          {showContainer ? (
            <MdKeyboardArrowRight size={24} />
          ) : (
            <MdKeyboardArrowLeft size={24} />
          )}
        </button>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="fixed bottom-24 right-6 bg-gray-700 text-white text-xs px-3 py-1 rounded shadow-lg">
          {tooltipMessage}
        </div>
      )}

      {/* Left container for Save and Cancel buttons */}
      <div
        className={`fixed bottom-6 right-[4rem] mb-4 mr-4 transition-transform duration-300 ease-in-out z-20 ${
          showContainer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {showContainer && (
          <div className="bg-white shadow-lg px-4 py-2 rounded-lg text-xs">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => {
                onSave(); // Call the save function
                setShowContainer(false); // Hide container after save
              }}
            >
              {saveLabel}
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                if (onCancel) onCancel(); // Call the cancel function if provided
                setShowContainer(false); // Hide on cancel
              }}
            >
              {cancelLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
