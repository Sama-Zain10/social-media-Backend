"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.ConflictException = exports.NotFoundException = exports.ForbiddenException = exports.UnauthorizedException = exports.BadRequestException = exports.ApplicationError = void 0;
class ApplicationError extends Error {
    status;
    constructor(message, options, status = 500) {
        super(message, options);
        this.status = status;
        this.name = this.constructor.name;
    }
}
exports.ApplicationError = ApplicationError;
// BadRequestException
class BadRequestException extends ApplicationError {
    constructor(message, options) {
        super(message, options, 400);
    }
}
exports.BadRequestException = BadRequestException;
// UnauthorizedException
class UnauthorizedException extends ApplicationError {
    constructor(message, options) {
        super(message, options, 401);
    }
}
exports.UnauthorizedException = UnauthorizedException;
//ForbiddenException
class ForbiddenException extends ApplicationError {
    constructor(message, options) {
        super(message, options, 403);
    }
}
exports.ForbiddenException = ForbiddenException;
// NotFoundException
class NotFoundException extends ApplicationError {
    constructor(message, options) {
        super(message, options, 404);
    }
}
exports.NotFoundException = NotFoundException;
//ConflictException
class ConflictException extends ApplicationError {
    constructor(message, options) {
        super(message, options, 409);
    }
}
exports.ConflictException = ConflictException;
const globalErrorHandler = (err, req, res, next) => {
    return res.status(err.status || 500).json({ message: err.message || "Something went wrong", stack: err.stack, cause: err.cause });
};
exports.globalErrorHandler = globalErrorHandler;
