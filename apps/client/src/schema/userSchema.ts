import z from "zod";
import dayjs from "dayjs";

export const adminUserSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmpassword: z.string().min(1, "Confirm Password is required"),
    phone: z
      .string()
      .min(10, "Phone number must be 10 digits")
      .max(10, "Phone number must be 10 digits"),
    dob: z
      .string()
      .min(1, "Date of birth is required")
      .transform((val) => dayjs(val).format("YYYY-MM-DD"))
      .refine((val) => dayjs(val).isBefore(dayjs(), "day"), {
        message: "Date of birth cannot be in the future",
      }),
    gender: z.enum(["m", "f", "o"], {
      message: "Gender must be 'm', 'f', or 'o'",
    }),
    address: z.string().min(1, "Address is required"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

export const userSchema = adminUserSchema.and(
  z.object({
    role_id: z.string().min(1, "Role ID is required"),
  }),
);

export type AdminUserSchemaType = z.infer<typeof adminUserSchema>;
export type UserSchemaType = z.infer<typeof userSchema>;
