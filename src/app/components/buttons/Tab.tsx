import React from "react";
import { twMerge } from "tailwind-merge";

interface Tab {
  name: string;
  tabValue: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string; // Current active tab
  containerClassName?: string; // For additional container styles
  buttonClassName?: string; // For additional button styles
  activeClassName?: string; // Custom class for active state
  inactiveClassName?: string; // Custom class for inactive state
}

export const Tab = ({
  tabs,
  activeTab,
  containerClassName,
  buttonClassName,
  activeClassName = "bg-gray-200 text-white border-b-2 border-border-500", // Default active styles
  inactiveClassName = "bg-white hover:bg-gray-200 text-gray-700", // Default inactive styles
}: TabsProps) => {
  return (
    <div className={twMerge("flex space-x-2 p-4", containerClassName)}>
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={twMerge(
            "flex items-center space-x-2 p-2 transition",
            buttonClassName,
            activeTab === tab.tabValue ? activeClassName : inactiveClassName
          )}
          onClick={tab.onClick}
        >
          {tab.icon}
          <span>{tab.name}</span>
        </button>
      ))}
    </div>
  );
};
