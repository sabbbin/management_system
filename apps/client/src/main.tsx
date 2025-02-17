import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const contextClass = {
  success: "border-2 border-[#12AC0F] bg-green-100 text-[#262626]",
  error: "bg-red-100 border-2 border-[#C42B1C] text-[#262626]",
  info: "bg-blue-100 border border-2 border-[#077BFF] text-[#262626] ",
  warning: "bg-orange-100 border-2 border-[#FEC022] text-[#262626]",
  default: "bg-indigo-600",
};

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <ToastContainer
      className="flex  text-center  items-center gap-2"
      toastClassName={(context) =>
        contextClass[context?.type || "default"] +
        " relative flex items-center  p-2  min-w-[200px]  h-13 border rounded-md  overflow-hidden cursor-pointer "
      }
      autoClose={5000}
      position="bottom-right"
    />
  </StrictMode>,
);
