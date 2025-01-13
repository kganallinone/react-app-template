import React, { useEffect } from "react";

type DrawerProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animation?:
    | "from-top-to-bottom"
    | "from-bottom-to-top"
    | "from-left-to-right"
    | "from-right-to-left";
  children: React.ReactNode;
};

export const Drawer = ({
  isOpen,
  setIsOpen,
  children,
  animation = "from-top-to-bottom",
}: DrawerProps) => {
  // Debug: Log when the overlay is clicked
  const handleOverlayClick = () => {
    console.log("Overlay clicked");
    setIsOpen(false); // Close the drawer when the overlay is clicked
  };

  // Effect to listen for ESC key press to close the drawer
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false); // Close drawer on ESC key
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setIsOpen]);

  const getAnimationClass = () => {
    switch (animation) {
      case "from-top-to-bottom":
        return isOpen ? "translate-y-0" : "-translate-y-full";
      case "from-bottom-to-top":
        return isOpen ? "translate-y-0" : "translate-y-full";
      case "from-left-to-right":
        return isOpen ? "translate-x-0" : "-translate-x-full";
      case "from-right-to-left":
        return isOpen ? "translate-x-0" : "translate-x-full";
      default:
        return "translate-y-0"; // Default animation (from top to bottom)
    }
  };

  return (
    <div
      id="drawer"
      className={`fixed inset-0 z-50 transition-transform duration-300 ease-in ${
        isOpen ? "block" : "hidden"
      }`}
      style={{
        transform: getAnimationClass(),
      }}
    >
      {/* Overlay with background and close functionality */}
      <div
        className="absolute inset-0 bg-black opacity-50 z-40"
        onClick={handleOverlayClick} // Close the drawer when clicked
      ></div>

      {/* Drawer Content */}
      <div
        className="relative z-50 h-full flex flex-col"
        style={{ pointerEvents: "auto" }} // Ensures that drawer content can receive clicks if needed
      >
        <div
          className="overflow-auto flex-1"
          onClick={handleOverlayClick}
        ></div>
        <div className="bg-white h-3/4 rounded-t-xl">
          <div id="drawer-children" className="overflow-auto p-2 rounded-t-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
