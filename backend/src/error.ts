export abstract class MotoVoltError extends Error {
    public errorCode: number;
    public date: Date = new Date();
    constructor(message: string, errorCode: number) {
        super(message);
        this.name = "MotoVoltError";
        this.errorCode = errorCode;
    }
}

export class BadRequestError extends MotoVoltError {
    constructor(m: string) {
        super(m, 400);
        this.name = 'BadRequestError';
    }
}

export class UnauthorizedError extends MotoVoltError {
    constructor(m: string) {
        super(m, 401);
        this.name = 'UnauthorizedError';
    }
}

export class ForbiddenError extends MotoVoltError {
    constructor(m: string) {
        super(m, 403);
        this.name = 'ForbiddenError';
    }
}

export class NotFoundError extends MotoVoltError {
    constructor(m: string) {
        super(m, 404);
        this.name = 'NotFoundError';
    }
}

export class UserError extends MotoVoltError {
    constructor(m: string) {
        super(m, 1000);
        this.name = 'UserError'
    }
}