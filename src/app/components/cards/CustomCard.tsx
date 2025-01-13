import { twMerge } from "tailwind-merge";

type CardContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const CardContainer = ({ children, className }: CardContainerProps) => {
  return (
    <div
      className={twMerge(
        "w-full bg-white rounded-lg p-2 shadow-sm border",
        className
      )}
    >
      {children}
    </div>
  );
};
