import { Link}  from "react-router-dom";
import AppField from "../component/ui/app-field";
import { AdminUserSchemaType } from "../schema/userSchema";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { BaseSyntheticEvent} from "react";


export interface IRegisterContent {
  
  isPending: boolean;
  handleSubmit: (e?: BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<AdminUserSchemaType>;
  errors: FieldErrors<AdminUserSchemaType>;
  type:'artist'| 'admin' | 'artist_manager';
    control: Control<AdminUserSchemaType>;

}


export const RegisterPageContent=({
   handleSubmit,
    type,
  register,
  errors,
  isPending,  
  control
}:IRegisterContent)=>{
    



    return (
          <section className="my-10 p-10  flex flex-col gap-4 bg-white rounded-lg">
         <header>
          <h1 className="text-[24px] font-medium"> Sign up</h1>
          <p className="text-[12px] text-gray-500"> Enter you details below to create your account and get started</p>
         </header>
         <main >
           <form 
            onSubmit={handleSubmit}
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

  
<Controller        
  control={control}
  rules={{ required: true }}
  render={({ field: { onChange, onBlur, value  } , fieldState: { error }}) => (
    <div className="flex flex-col">
            <h1 className="text-[14px]">Gender</h1>
    <select
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      className="w-full  text-gray-500 mt-1 h-8 px-3 border border-gray-300 rounded-md bg-white  focus:outline-none focus:ring-0 focus:ring-primary-500 focus:border-primary-500"
    >
      <option className="text-gray-500" value="" hidden>
        Select gender
      </option>
      {['0', 'f', 'm'].map((val) => (
        <option 
        className="text-gray-700"
          key={`${val}eth`}
          value={val}
          >
          {val}
        </option>
      ))}
    </select>
        {error?.message? 
         
         <p className="text-[12px] mt-1 text-red-500"> {error.message}  </p>
         :   <p className="text-[12px] opacity-0 mt-1 text-red-500"> sadf </p>
}
         </div>
  )}
  name="gender"
/>
 {type!=='admin' &&<Controller        
  control={control}
  rules={{ required: true }}
  render={({ field: { onChange, onBlur, value  } , fieldState: { error }}) => (
    <div className="flex flex-col">
            <h1 className="text-[14px]">Role</h1>
    <select
      onChange={onChange}
      value={value}
      onBlur={onBlur}
      className="w-full  text-gray-500 mt-1 h-8 px-3 border border-gray-300 rounded-md bg-white  focus:outline-none focus:ring-0 focus:ring-primary-500 focus:border-primary-500"
    >
      <option className="text-gray-500" value="" hidden>
        Select gender
      </option>
      {['a'].map((val) => (
        <option 
        className="text-gray-700"
          key={`${val}eth`}
          value={val}
          >
          {val}
        </option>
      ))}
    </select>
        {error?.message? 
         
         <p className="text-[12px] mt-1 text-red-500"> {error.message}  </p>
         :   <p className="text-[12px] opacity-0 mt-1 text-red-500"> sadf </p>
}
         </div>
  )}
  name="role_id"
/>}
        <AppField  {...register('address')}
            error={!!errors.address?.message}
         helperText={errors.address?.message}  label="Address" />
          <div className="grid text-[14px] grid-cols-2 mt-4 gap-4 md:col-span-2">
    <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md">Submit</button>
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