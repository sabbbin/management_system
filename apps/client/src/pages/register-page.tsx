import { Link } from "react-router-dom";
import AppField from "../component/ui/app-field";


export const RegisterPage=()=>{
    
    return (
          <section className="my-10 p-10  flex flex-col gap-4 bg-white rounded-lg">
         <header>
          <h1 className="text-[24px] font-medium"> Sign up</h1>
          <p className="text-[12px] text-gray-500"> Enter you details below to create your account and get started</p>
         </header>
         <main className="grid grid-cols-1  space-x-4 md:grid-cols-2">
          <AppField label="First Name" />
          <AppField label="Last Name" />
          <AppField label="Email" type='email' />
          <AppField label="Phone Number" />
          <AppField label="Password" type='password' />
          <AppField label="Confirm Password" type='password' />
          <AppField label="D.O.B" type='date' />
          <AppField label="Gender" />
          <AppField label="Role" />
          <AppField label="Address" />
          <div className="grid text-[14px] grid-cols-2 mt-4 gap-4 md:col-span-2">
    <button className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Confirm</button>
  </div>
             
         </main>
      <footer className="flex justify-center">
          <p className="text-[12px] text-gray-500">
               Already have a account ?  <Link  className ='text-blue-400' to='/login'> Login</Link>     </p>
      </footer>
    </section>
    );
}