import z from "zod";

export const adminUserSchema = z.object({
  first_name: z.string().min(1, "first_name is required"),
  last_name: z.string().min(1, "first_name is required"),
  email: z.string().min(1, "email is required").email(),
  password: z.string().min(1, "password is required"),
  phone: z.string().length(10, "Digit must be 10 digits"),
  dob: z.string(),
  gender: z.enum(["m", "f", "o"]),
  address: z.string().min(1, "address is required"),
});


export const userSchema =  adminUserSchema.merge(z.object({
  role_id: z.string().min(1, "role_id is required"),
}));

export type AdminSchemaType = z.infer<typeof adminUserSchema>;
export type UserSchemaType = z.infer<typeof userSchema>;
