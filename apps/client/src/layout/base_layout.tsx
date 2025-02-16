import { ReactNode } from "@tanstack/react-router";


export const BaseLayout= ({children}:{children:ReactNode})=>{

  return (
  <div className="min-h-[100dvh] overflow-y-auto bg-gray-200 grid  place-content-center">
 
  {children}
  </div>
  );  
}


