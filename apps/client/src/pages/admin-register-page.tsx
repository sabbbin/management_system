import { useNavigate } from "react-router-dom";
import { userSchema, UserSchemaType } from "../schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../hooks/base-api";
import { RegisterPageContent } from "./register-page_content";


export const RegisterPage=()=>{
    

      const {
        control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSchemaType>({
    defaultValues: {
      
  first_name: "",
  last_name: "",
  email: "",
  role_id: "",
  password: "",
  confirmpassword: "",
  phone: "",
  dob: "", // Format: YYYY-MM-DD if needed
  address: "",


    },
    resolver: zodResolver(userSchema),
  });
 const navigate= useNavigate();

  const [pending, startTransition]= useTransition();
   const {mutate}= useMutation({
    mutationFn:(data:UserSchemaType)=>
         axiosInstance().post('/auth/login' ,
          data
         ).then(res=>res.data)}
   )

 const handleSubmitFn=(data:UserSchemaType
 )=>{
   startTransition(()=>{
        mutate(data, {onSuccess(data, variables, context) {
             if (data.success==true)   {
               navigate('/')
             }
              else {
                toast('Login Failed', {type:'error'})
              }
        },})
    })

 }


    return (
       <RegisterPageContent 
          isPending={pending}
          control={control}
        type='admin'
        register={register}
        errors={errors}
        handleSubmit={handleSubmit(handleSubmitFn)}
       />
    );
}