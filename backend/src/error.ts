export abstract class MotoVoltError extends Error {
    public errorCode: number;
    // public date: Date = new Date();
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

export class RideError extends MotoVoltError {
    constructor(m: string) {
        super(m, 2000);
        this.name = 'RideError'
    }
}

export class BikeError extends MotoVoltError {
    constructor(m: string) {
        super(m, 3000);
        this.name = 'BikeError'
    }
}

export class FeedbackError extends MotoVoltError {
    constructor(m: string) {
        super(m, 4000);
        this.name = 'FeedbackError'
    }
}

export class IssuesError extends MotoVoltError {
    constructor(m: string) {
        super(m, 7000);
        this.name = 'IssuesError'
    }
}

export class FeaturesError extends MotoVoltError {
    constructor(m: string) {
        super(m, 5000);
        this.name = 'FeaturesError'
    }
}

export class SupportError extends MotoVoltError {
    constructor(m: string) {
        super(m, 4000);
        this.name = 'SupportError'
    }
}