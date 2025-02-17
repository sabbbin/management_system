import { useState } from "react";
import {
  LoginSession,
  useLoginSessionStore,
} from "../store/login-session-store";
import { Model } from "../component/ui/dialog-box";
import { createPortal } from "react-dom";
import { RegisterPage } from "./admin-register-page";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../hooks/base-api";

export const Dashboard = () => {
  const [open, setOpen] = useState(true);
  const { navItem } = useLoginSessionStore<LoginSession>((state) => state);
  console.log("daah", navItem);
  return (
    <div className="flex  ">
       <aside className="w-[350px] h-[100dvh] bg-white" >
          adsf
       </aside>
      <main>
          <section className="grid p-4 overflow-y-auto h-[100dvh] w-[calc(100dvw-350px)] gap-4  md:gap-0 grid-rows-[3fr_7fr_5fr]  md:grid-cols-[8fr_4fr] ">
  <div className="grid  gap-4 md:grid-flow-col md:col-span-1 md:mr-2 ">
    {USER_LIST_SUMMARY.map((val) => (
      <Card name={val.name} val={val.val} />
    ))}
  </div>

  <div className="bg-white md:ml-2 md:grid md:col-span-1 md:row-span-3">
    <ActorList />
  </div>

  <div className=" bg-white md:col-span-1  md:mt-4  md:mr-2 md:row-span-3" >
    <LastUserList />
  </div>
</section>

      </main>
    </div>
  );
};



const USER_LIST_SUMMARY=[
     {name:'userlist', val:1},
     {name:'artist', val:1},
     {name:'songs', val:1},
]

interface ICard {
     name:string;
     val:number
}

export const ActorList=()=>{
       const { refetch , data} = useQuery( {queryKey:['userlist'],  
     queryFn: () => 
      axiosInstance()
        .get("/user/dashboard")
        .then((res) => res.data)}
     )
  
     return (
        <div className="bg-white p-4 rounded-md">
           <div className="flex justify-between">

           <h1 className="text-[18px] font-medium"> ActorList </h1>
           <button className="text-[14px]"> Viw all</button>
           </div>
            <div className="flex flex-col mt-5">

           {data?.data?.map(val=>(
               <div className="p-1">
                {val.first_name}
               </div>
           ))}
            </div>
        </div>

     );
}

export const LastUserList=()=>{
       const { refetch , data} = useQuery( {queryKey:['userlist'],  
     queryFn: () => 
      axiosInstance()
        .get("/user/dashboard")
        .then((res) => res.data)}
     )
  
     return (
        <div className="bg-white p-4">
           <h1> UserList </h1>
           {data?.data?.map(val=>(
               <>
                {val.first_name}
               </>
           ))}
        </div>

     );
}



export const Card =({name, val}:ICard)=>{

return (
 <div className="border-[1px] p-2  rounded-md border-gray-300 bg-white">
      <p> {name}</p>
      <h1 className="text-[24px]"> {val}</h1>
 </div>

);
}

{/* <button className="cursor-pointer" onClick={() => setOpen(true)}>
  {" "}
  open{" "}
</button>
{open &&
  createPortal(
    <Model onClose={() => setOpen(false)}>
      <RegisterPage />
    </Model>,
    document.body,
  )} */}