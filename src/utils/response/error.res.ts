import { NextFunction, Request, Response } from "express";

export interface IError extends Error {
    status: number;
}
export class ApplicationError extends Error {
    constructor(message: string, options?: ErrorOptions, public status: number = 500) {
        super(message, options);
        this.name = this.constructor.name;
    }
}
// BadRequestException
export class BadRequestException extends ApplicationError {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options, 400);
    }
}
// UnauthorizedException
export class UnauthorizedException extends ApplicationError {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options, 401);
    }
}
//ForbiddenException
export class ForbiddenException extends ApplicationError {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options, 403);
    }
}
// NotFoundException
export class NotFoundException extends ApplicationError {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options, 404);
    }
}
//ConflictException
export class ConflictException extends ApplicationError {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options, 409);
    }
}

export const globalErrorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).json({ message: err.message || "Something went wrong", stack: err.stack , cause:err.cause});
}



