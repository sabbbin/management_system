import AppField from "../component/ui/app-field";
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { LoginResponse, loginStateData } from "../store/login-session-store";
import { axiosInstance } from "../hooks/base-api";
import { createLazyFileRoute } from "@tanstack/react-router";
import { LoginSchemaType, loginSchema } from "../schema/loginSchema";

interface  ResponseProps<T> {
    status:'success'| 'failure',
    msg?:string;
    data:T
}

export enum  RESPONSESTATUSENUM {
    SUCCESS='success',
    FALLURE= 'failure'
}



 export default function  LoginPage () {

      const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    defaultValues: {
      user: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  });
 const navigate= useNavigate();

  const [pending, startTransition]= useTransition();


 const handleSubmitFn=(data:LoginSchemaType
 )=>{
  
    startTransition(()=>{

    })

 }


      return (
     <section className="md:my-10 p-10    flex flex-col gap-4 bg-white rounded-lg">
         <header className="flex  flex-col   items-center space-y-1">
          <h1 className="text-[24px] font-medium"> Welcome Back</h1>
          <p className="text-[12px] text-center text-gray-500"> Glad to see you again
            <br/>
            Login to your account below

          </p>
         </header>
         <main className="flex flex-col ">
     <form
      onSubmit={handleSubmit(handleSubmitFn)}
     >

          <AppField 
         {...register('user')}
         error={!!errors.user?.message}
         helperText={errors.user?.message}
          label="Username" />
          <AppField
          
         {...register('password')}
           error={!!errors.password?.message}
         helperText={errors.password?.message}
          label="Password" type='password' />
    
   <button    className="bg-blue-500 cursor-pointer w-full mt-1 text-white px-4 py-2 rounded-md">{pending?'...':'Login'}</button>
             
     </form>
         </main>
      <footer className="flex justify-center">
          <p className="text-[12px] text-gray-500">
               Do you want to create new User? <Link className="text-blue-500" to ='/signup'> register</Link>    </p>
      </footer>
    </section>
  );
}