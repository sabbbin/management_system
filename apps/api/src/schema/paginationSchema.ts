import zod from "zod";

export const paginationSchema = zod.object({
  limit: zod.string().min(1, "username is required"),
  offset: zod.string().min(1, "password is required"),
});

export type PaginationSchemaType = zod.infer<typeof paginationSchema>;
