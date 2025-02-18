import { ReactNode } from "@tanstack/react-router";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div className="min-h-[100dvh] overflow-y-auto bg-gray-200  ">
      <div className="flex  ">
        <aside className="w-[350px] h-[100dvh] p-2  flex flex-col bg-white">
          <header className="my-5  bg-gray-100 p-2 rounded-lg border-gray-400">
            <p> Welcome, Sabin </p>
          </header>
          <main className="flex flex-1">
            <div className="flex flex-col  px-2   gap-4 ">
              <p className="text-[16px] font-medium">Dashboard</p>
              <p className="text-[16px] font-medium">User</p>
              <p className="text-[16px] font-medium">Artist</p>
            </div>
          </main>
          <footer className="my-5  font-medium text-[16px] p-2 rounded-lg border-gray-400">
            <p> logout </p>
          </footer>
        </aside>
        <main className="max-h-[100dvh] p-4 overflow-y-auto  w-[calc(100dvw-350px)] ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
