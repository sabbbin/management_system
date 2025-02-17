import { ReactNode } from "@tanstack/react-router";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div className="min-h-[100dvh] overflow-y-auto bg-gray-200 p-2 ">
      <Outlet />
    </div>
  );
};
