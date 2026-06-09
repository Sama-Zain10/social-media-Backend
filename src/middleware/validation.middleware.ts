import { NextFunction, Request, Response } from "express";
import z, { ZodError, ZodType } from "zod";
import { BadRequestException } from "../utils/response/error.res";
type KeyReqType = keyof Request;
type SchemaType = Partial<Record<KeyReqType, ZodType>>;
export const validation = (schema: SchemaType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validationError: Array<{
            key: KeyReqType,
            issue: Array<{
                path: (string | number | symbol)[],
                message: string
            }>
        }> = [];
        for (const key of Object.keys(schema) as KeyReqType[]) {
            if (!schema[key]) continue;
            const validationResults = schema[key].safeParse(req[key as KeyReqType]);
            if (validationResults.success === false) {
                const errors = validationResults.error as ZodError;
                validationError.push({
                    key: key,
                    issue: errors.issues.map((issue) => ({
                        path: issue.path,
                        message: issue.message,
                        code: issue.code,
                    })),
                });
            }
        }
        if (validationError.length > 0) {
            throw new BadRequestException("Validation Error", {
                cause: validationError,
            });
        }
        return next();
    }
}



export const generalfield = {
    email:
        z.email({ error: "Email is required" }),
    password:
        z.string().
            min(6, { error: "Password must be at least 6 characters long" })
            .max(30, {
                error: "Password must be at most 30 characters long",
            }),
    username:
        z.string({ error: "Username is required" })
            .min(3, { error: "Username must be at least 3 characters long" })
            .max(20, { error: "Username must be at most 20 characters long" }),
    confirmPassword:
        z.string().
            min(6, { error: "Confirm password must be at least 6 characters long" })
            .max(30, { error: "Confirm password must be at most 30 characters long" }),
    gender:
        z.enum(["male", "female"],
            { error: "Gender must be either male or female" }
        ).optional(),
}
