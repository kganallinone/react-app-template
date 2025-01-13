import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="flex">
      <div className="flex flex-col min-h-screen flex-1">
        <div className="flex flex-col bg-secondary min-h-[calc(100%)] px-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
