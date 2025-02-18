import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginSessionStore } from "../../store/login-session-store";
import { axiosInstance } from "../../hooks/base-api";
import { LoginSchemaType, loginSchema } from "../../schema/loginSchema";
import { LoginPage } from "./login-page";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface ResponseProps<T> {
  status: "success" | "failure";
  msg?: string;
  data: T;
}

export enum RESPONSESTATUSENUM {
  SUCCESS = "success",
  FALLURE = "failure",
}

export default function AdminLoginPage() {
  const login = useLoginSessionStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    defaultValues: {
      user: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const [pending, startTransition] = useTransition();

  const { mutate } = useMutation({
    mutationFn: (data: LoginSchemaType) =>
      axiosInstance()
        .post("/auth/login", data)
        .then((res) => res.data),
  });

  const handleSubmitFn = (data: LoginSchemaType) => {
    startTransition(() => {
      mutate(data, {
        onSuccess(data, variables, context) {
          if (data.success == true) {
            login(data.data);
            navigate("/");
          } else {
            toast("Login Failed", { type: "error" });
          }
        },
      });
    });
  };

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
