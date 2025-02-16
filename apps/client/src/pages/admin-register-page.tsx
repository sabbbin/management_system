import { Link, useNavigate } from "react-router-dom";
import AppField from "../component/ui/app-field";
import { userSchema, UserSchemaType } from "../schema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { LoginSchemaType } from "../schema/loginSchema";


export const RegisterPage=()=>{
    

      const {
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
  gender: "o", // Default to "o" (other)
  address: "",


    },
    resolver: zodResolver(userSchema),
  });
 const navigate= useNavigate();

  const [pending, startTransition]= useTransition();


 const handleSubmitFn=(data:UserSchemaType
 )=>{
  
    startTransition(()=>{

    })

 }


    return (
          <section className="my-10 p-10  flex flex-col gap-4 bg-white rounded-lg">
         <header>
          <h1 className="text-[24px] font-medium"> Sign up</h1>
          <p className="text-[12px] text-gray-500"> Enter you details below to create your account and get started</p>
         </header>
         <main >
           <form 
            onSubmit={handleSubmit(handleSubmitFn)}
           className="grid grid-cols-1  space-x-4 md:grid-cols-2">

           <AppField label="First Name"  
          {...register('first_name')}
            error={!!errors.first_name?.message}
         helperText={errors.first_name?.message} 
          />
          <AppField 
           {...register('last_name')}
            error={!!errors.last_name?.message}
         helperText={errors.last_name?.message} 
          label="Last Name" />
          <AppField
          
           {...register('email')}
            error={!!errors.email?.message}
         helperText={errors.email?.message} label="Email" type='email' />
          <AppField
           {...register('phone')}
            error={!!errors.phone?.message}
         helperText={errors.phone?.message} 
          label="Phone Number" />
          <AppField  
           {...register('password')}
            error={!!errors.password?.message}
         helperText={errors.password?.message} 
          label="Password" type='password' />
          <AppField  {...register('confirmpassword')}
            error={!!errors.confirmpassword?.message}
         helperText={errors.confirmpassword?.message}  label="Confirm Password" type='password' />
          <AppField  {...register('dob')}
            error={!!errors.dob?.message}
         helperText={errors.dob?.message}  label="D.O.B" type='date' />
          <AppField  {...register('gender')}
            error={!!errors.gender?.message}
         helperText={errors.gender?.message}  label="Gender" />
          <AppField  {...register('role_id')}
            error={!!errors.role_id?.message}
         helperText={errors.role_id?.message}  label="Role" />
          <AppField  {...register('address')}
            error={!!errors.address?.message}
         helperText={errors.address?.message}  label="Address" />
          <div className="grid text-[14px] grid-cols-2 mt-4 gap-4 md:col-span-2">
    <button type='button' className="bg-gray-300 px-4 py-2 rounded-md">Cancel</button>
    <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md">Confirm</button>
  </div>
             
           </form>
         </main>
      <footer className="flex justify-center">
          <p className="text-[12px] text-gray-500">
               Already have a account ?  <Link  className ='text-blue-400' to='/login'> Login</Link>     </p>
      </footer>
    </section>
    );
}