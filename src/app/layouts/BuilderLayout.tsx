import { Outlet } from "react-router-dom";

export const BuilderLayout = () => {
  return (
    <div className="w-screen h-screen">
      <div className="bg-gray-200 h-full">
        <Outlet />
      </div>
    </div>
  );
};
