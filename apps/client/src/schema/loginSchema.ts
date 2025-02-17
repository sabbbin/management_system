import zod from "zod";
export const loginSchema = zod.object({
  user: zod.string().min(1, "username is required"),
  password: zod.string().min(1, "password is required"),
});

export type LoginSchemaType = zod.infer<typeof loginSchema>;
