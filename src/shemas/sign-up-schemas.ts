import z from "zod";

export const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&#^()_+\-=\\[\]{};':"\\|,.<>\\/]/, "Password must contain at least one special character");

export const signupSchema = z
    .object({
        firstName: z.string().min(1, "First Name is required"),
        lastName: z.string().min(1, "lastName is required"),
        email: z.email("Invalid email"),
        password: passwordSchema,
        cPassword: z.string().min(6, "Confirm Password is required"),
    })
    .refine((data) => data.password === data.cPassword, {
        message: "Passwords do not match",
        path: ["cPassword"],
    });

export type SignupFormType = z.infer<typeof signupSchema>