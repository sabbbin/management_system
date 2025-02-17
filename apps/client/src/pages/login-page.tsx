import AppField from "../component/ui/app-field";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginSchemaType } from "../schema/loginSchema";
import { BaseSyntheticEvent } from "react";

interface ResponseProps<T> {
  status: "success" | "failure";
  msg?: string;
  data: T;
}

export enum RESPONSESTATUSENUM {
  SUCCESS = "success",
  FALLURE = "failure",
}

export interface ILoginContent {
  isPending: boolean;
  handleSubmitLogin: (e?: BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegister<LoginSchemaType>;
  errors: FieldErrors<LoginSchemaType>;
  type: "user" | "admin";
}

export function LoginPage({
  handleSubmitLogin,
  type,
  register,
  errors,
  isPending,
}: ILoginContent) {
  return (
    <section className="md:my-10 p-10    flex flex-col gap-4 bg-white rounded-lg">
      <header className="flex  flex-col   items-center space-y-1">
        <h1 className="text-[24px] font-medium"> Welcome Back</h1>
        <p className="text-[12px] text-center text-gray-500">
          {" "}
          Glad to see you again
          <br />
          Login to your account below
        </p>
      </header>
      <main className="flex flex-col ">
        <form onSubmit={handleSubmitLogin}>
          <AppField
            {...register("user")}
            error={!!errors.user?.message}
            helperText={errors.user?.message}
            label="Phone No"
          />
          <AppField
            {...register("password")}
            error={!!errors.password?.message}
            helperText={errors.password?.message}
            label="Password"
            type="password"
          />

          <button className="bg-blue-500 cursor-pointer w-full mt-1 text-white px-4 py-2 rounded-md">
            {isPending ? "..." : "Login"}
          </button>
        </form>
      </main>
      {type == "admin" && (
        <footer className="flex justify-center">
          <p className="text-[12px] text-gray-500">
            Do you want to create new User?{" "}
            <Link className="text-blue-500" to="/admin/signup">
              New Register
            </Link>{" "}
          </p>
        </footer>
      )}
    </section>
  );
}
