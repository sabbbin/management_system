import { forwardRef } from "react";

interface IAppFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  
}

export const AppField = forwardRef<HTMLInputElement, IAppFieldProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <h1 className="text-[14px]">{label}</h1>
        <input
          ref={ref}
          className="border-[1px] w-[350px] text-gray-500 mt-[5px] border-gray-300 rounded-md focus:outline-none  px-3 py-1 "
          {...props} 
        />
         
        <p className="text-[12px] mt-1 text-red-500">asdf  </p>
      </div>
    );
  }
);

export default AppField;
