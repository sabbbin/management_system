import React from "react";
import  { Cross1Icon } from '@radix-ui/react-icons'

interface ModelProps {
 onClose:()=>void;
 children:React.ReactNode
}
export const Model=({onClose, children}:ModelProps)=>{


    return(
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 w-full h-full">
  <div className="relative min-w-1/2 min-h-1/2 bg-white shadow-lg p-8 flex flex-col  rounded-lg overflow-y-auto">
         <header>
             <Cross1Icon onClick={onClose}  className="float-right cursor-pointer " height={'20'} width={'20'} />
            
         </header>
   
  {children}
  </div>
</div>

       

    );

}