import { Outlet } from "react-router-dom";

export const AttendanceLayout = () => {
  return (
    <div className="flex">
      <div className="flex flex-col min-h-screen flex-1">
        <div className="flex flex-col bg-[#fcfcfc] min-h-[calc(100%-4rem)] px-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
