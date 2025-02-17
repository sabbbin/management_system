
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { LoginSchemaType, loginSchema } from "../schema/loginSchema";

import {useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../hooks/base-api';
import { LoginPage } from './login-page';
import { toast} from 'react-toastify';
import { useLoginSessionStore } from '../store/login-session-store';



 export default function  UserLoginPage () {
 const login= useLoginSessionStore(state=>state.login)
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

   const {mutate}= useMutation({
    mutationFn:(data:LoginSchemaType)=>
         axiosInstance().post('/auth/login' ,
          data
         ).then(res=>res.data)}
   )

 const handleSubmitFn=(data:LoginSchemaType
 )=>{
    startTransition(()=>{
        mutate(data, {onSuccess(data, variables, context) {
             if (data.success==true)   {
              login(data)
               navigate('/')
             }
              else {
                toast('Login Failed', {type:'error'})
              }
        },})
    })

 }


      return (
    <LoginPage
     type="user"
     isPending={pending}
        register={register}
        errors={errors}
        handleSubmitLogin={handleSubmit(handleSubmitFn)}
    
    />
  );
}