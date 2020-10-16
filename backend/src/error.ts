export abstract class MotoVoltError extends Error {
    public errorCode: number;
    constructor(message: string, errorCode: number) {
        super(message);
        this.name = "MOTOVOLT_ERROR";
        this.errorCode = errorCode;
    }
}

export class BadRequestError extends MotoVoltError {
    constructor(m: string) {
        super(m, 400);
        this.name = 'BAD_REQUEST_EROR';
    }
}

export class UnauthorizedError extends MotoVoltError {
    constructor(m: string) {
        super(m, 401);
        this.name = 'UNAUTHORIZED_ERROR';
    }
}

export class ForbiddenError extends MotoVoltError {
    constructor(m: string) {
        super(m, 403);
        this.name = 'FORBIDDEN_ERROR';
    }
}

export class NotFoundError extends MotoVoltError {
    constructor(m: string) {
        super(m, 404);
        this.name = 'NOT_FOUND_ERROR';
    }
}

export class UserError extends MotoVoltError {
    constructor(m: string) {
        super(m, 1000);
        this.name = 'USER_ERROR'
    }
}

export class RideError extends MotoVoltError {
    constructor(m: string) {
        super(m, 2000);
        this.name = 'RIDE_ERROR'
    }
}

export class BikeError extends MotoVoltError {
    constructor(m: string) {
        super(m, 3000);
        this.name = 'BIKE_ERROR'
    }
}

export class FeedbackError extends MotoVoltError {
    constructor(m: string) {
        super(m, 4000);
        this.name = 'FEEDBACK_ERROR'
    }
}

export class IssuesError extends MotoVoltError {
    constructor(m: string) {
        super(m, 5000);
        this.name = 'ISSUES_ERROR'
    }
}

export class FeaturesError extends MotoVoltError {
    constructor(m: string) {
        super(m, 6000);
        this.name = 'FEATURES_ERROR'
    }
}

export class SupportError extends MotoVoltError {
    constructor(m: string) {
        super(m, 7000);
        this.name = 'SUPPORT_ERROR'
    }
}

export class AlertError extends MotoVoltError {
    constructor(m: string) {
        super(m, 8000);
        this.name = 'ALERT_ERROR'
    }
}