import { z } from "zod";
import { passwordSchema } from "./sign-up-schemas";

export const addUserSchema = z.object({
    firstName: z
        .string()
        .trim()
        .min(1, "First name is required")
        .max(50, "First name must be under 50 characters"),
    lastName: z
        .string()
        .trim()
        .min(1, "Last name is required")
        .max(50, "Last name must be under 50 characters"),
    email: z.email("Invalid email address"),
    phone: z
        .string()
        .trim()
        .min(10, "Phone number is too short")
        .max(13, "Phone number is too long")
        .optional(),
    bio: z
        .string()
        .trim()
        .max(300, "Bio must be under 300 characters")
        .optional(),
    role: z.enum(['admin', 'user']),
    password: passwordSchema,
});

export type AddUserType = z.infer<typeof addUserSchema>;

