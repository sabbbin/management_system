import AppField from "../component/ui/app-field";

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from "react-router-dom";
import { LoginResponse, loginStateData } from "../store/login-session-store";
import { axiosInstance } from "../hooks/base-api";
import { createLazyFileRoute } from "@tanstack/react-router";
import { LoginSchemaType, loginSchema } from "../schema/loginSchema";
import { LoginPage } from "./login-page";

interface  ResponseProps<T> {
    status:'success'| 'failure',
    msg?:string;
    data:T
}

export enum  RESPONSESTATUSENUM {
    SUCCESS='success',
    FALLURE= 'failure'
}



 export default function  AdminLoginPage () {

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
     <LoginPage
         type="admin"
         isPending={pending}
            register={register}
            errors={errors}
            handleSubmitLogin={handleSubmit(handleSubmitFn)}
        
        />
  );
}