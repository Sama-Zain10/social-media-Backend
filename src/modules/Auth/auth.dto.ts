import z from 'zod';
import { LoginSchema, SignupSchema } from './auth.validation';
export type SignupDto = z.infer<typeof SignupSchema.body>;
export type LoginDto = z.infer<typeof LoginSchema.body>;