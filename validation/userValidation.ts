import { z } from 'zod';

export const LoginSchema = z.object({
    usernameOrEmail: z.string().min(4),
    password: z.string().min(6)
})

export const RegisterSchema = z.object({
    username: z.string().min(4),
    email: z.string().email().optional().nullable(),
    password: z.string().min(6)
})