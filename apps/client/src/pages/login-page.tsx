import AppField from "../component/ui/app-field";


export const LoginPage=()=>{
      return (
     <section className="my-10 p-10   flex flex-col gap-4 bg-white rounded-lg">
         <header className="flex  flex-col   items-center space-y-1">
          <h1 className="text-[24px] font-medium"> Welcome Back</h1>
          <p className="text-[12px] text-center text-gray-500"> Glad to see you again
            <br/>
            Login to your account below

          </p>
         </header>
         <main className="flex flex-col ">
          <AppField label="Username" />
          <AppField label="Password" type='password' />
    
   <button className="bg-blue-500 mt-2 text-white px-4 py-2 rounded-md">Login</button>
             
         </main>
      <footer className="flex justify-center">
          <p className="text-[12px] text-gray-500">
               Do you want to create new User <a href='/registe' />     </p>
      </footer>
    </section>
  );
}