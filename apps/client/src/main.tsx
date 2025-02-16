import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const contextClass = {
	success: "border-2 border-[#12AC0F] bg-green-100 text-[#262626]",
	error: "bg-red-100 border-2 border-[#C42B1C] text-[#262626]",
	info: "bg-blue-100 border border-2 border-[#077BFF] text-[#262626] ",
	warning: "bg-orange-100 border-2 border-[#FEC022] text-[#262626]",
	default: "bg-indigo-600",
};


createRoot(document.getElementById("root")!).render(
  <StrictMode>
			<App />
		<ToastContainer
			className='flex flex-col  gap-4'
			toastClassName={(context) =>
				contextClass[context?.type || "default"] +
				" relative flex p-2 w-[30rem] right-32 h-19 border rounded-md !gap-x-10 overflow-hidden cursor-pointer "
			}
			autoClose={5000} position='bottom-right' />
  </StrictMode>,
);
