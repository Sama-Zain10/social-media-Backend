import { z } from "zod";
import { generalfield } from "../../middleware/validation.middleware";
export const LoginSchema = {
  body: z.object({
    email: generalfield.email,
    password: generalfield.password,
  })
};

export const SignupSchema = {
  body: LoginSchema.body.extend({
    username: generalfield.username,
    gender: generalfield.gender,
    confirmPassword: generalfield.confirmPassword,
  })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["confirmPassword"],
          error: "Passwords do not match",
        });
      }
      if (data.username?.split(" ").length !== 2) {
        ctx.addIssue({
          code: "custom",
          path: ["username"],
          error: "Username must be 2 words",
        });
      }
    })
};

