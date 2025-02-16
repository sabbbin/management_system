import { forwardRef } from "react";

interface IAppFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?:boolean;
  helperText?:string;
}

export const AppField = forwardRef<HTMLInputElement, IAppFieldProps>(
  ({ label,error, helperText, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        <h1 className="text-[14px]">{label}</h1>
        <input
          ref={ref}
          className="border-[1px] w-[min(350px,100%)] text-gray-500 mt-[5px] border-gray-300 rounded-md focus:outline-none  px-3 py-1 "
          {...props} 
        />
         {error? 
         
         <p className="text-[12px] mt-1 text-red-500"> {helperText}  </p>
        :   <p className="text-[12px] opacity-0 mt-1 text-red-500"> sadf </p>
}
      </div>
    );
  }
);

export default AppField;
