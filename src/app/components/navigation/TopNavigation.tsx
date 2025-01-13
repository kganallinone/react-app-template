import React from "react";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const TopNavigation = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={twMerge(
        "flex w-full items-center justify-between min-h-16 h-16 bg-primary-base  border-b border-base",
        className
      )}
    >
      {children}
    </div>
  );
};

const Item = ({
  className,
  href,
  children,
  ...props
}: {
  className?: string;
  href: string;
  children: React.ReactNode;
}) => {
  const handleNavLinkStyle = (activeClass?: string) => {
    return twMerge(
      "p-4 px-6 text-sm hover:bg-primary-base/20",
      activeClass,
      className
    );
  };
  return (
    <NavLink
      className={({ isActive }: { isActive: boolean }): string =>
        isActive
          ? handleNavLinkStyle(
              "text-project-black bg-primary-base/20 hover:bg-primary-base/20"
            )
          : handleNavLinkStyle("")
      }
      to={href}
      {...props}
    >
      {children}
    </NavLink>
  );
};

TopNavigation.Item = Item;

export { TopNavigation };
