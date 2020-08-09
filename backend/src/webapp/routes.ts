import * as Express from "express";
import { validationResult, body, query } from "express-validator";
import { createResponse } from "../helper";
import WebAPI from "../externalApi/webapp";

const app = Express.Router();

function validate(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new Error((errors.array({ onlyFirstError: true })[0] as any).msg);
    }
    next();
}

export function expressQAsync(fn: Function) {
    return (req: Express.Request, res: Express.Response, next: any) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }
}

function secure(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) {
    // Authenticate requests
    console.log("webapp req secure", req);
    next();
}

function expressErrorHandler(
    err: Error,
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) {
    res.status(500);
    res.json({
        status: "Error",
    });
    next();
}

//dashboard main alerts
app.get('/mainAlerts', expressQAsync(secure),
    [query('alertType', "name is too short").isString().isLength({ min: 3 }),
    query("pageNo", "Email is invalid").toInt(),
    query("pageSize", "Email is invalid").toInt(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { alertType, pageNo, pageSize } = req.query as any
        const updated = await WebAPI.mainAlerts(alertType, pageNo, pageSize)
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)
//
app.get('/totalAlerts', expressQAsync(secure),
    [query('alertType', "name is too short").isString().isLength({ min: 3 }),
    query("startDate", "Email is invalid").isString(),
    query("endDate", "Email is invalid").isString(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { alertType, startDate, endDate } = req.query as any
        const updated = await WebAPI.totalAlerts(alertType, startDate, endDate)
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.get('/topFive', expressQAsync(secure),
    [query('alertType', "alertType is too short").isString().isLength({ min: 3 }),
    query("startDate", "startDate is invalid").isString(),
    query("endDate", "endDate is invalid").isString(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { alertType, startDate, endDate } = req.query as any
        const updated = await WebAPI.topFiveAlert(alertType, startDate, endDate)
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.get('/locationWise', expressQAsync(secure),
    [query('alertType', "alertType is too short").isString().isLength({ min: 3 }),
    query("startDate", "startDate is invalid").isString(),
    query("endDate", "endDate is invalid").isString(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { alertType, startDate, endDate } = req.query as any
        const updated = await WebAPI.locationWiseAlert(alertType, startDate, endDate)
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.post('/dashFilter', expressQAsync(secure),
    [body('alertType', "alertType is too short").isString().isLength({ min: 3 }),
    body("alertName", "startDate is invalid").isString(),
    body("startDate", "startDate is invalid").optional().isString(),
    body("endDate", "endDate is invalid").optional().isString(),
    body("model", "startDate is invalid").optional().isString(),
    body("subModel", "startDate is invalid").optional().isString(),
    body("location", "startDate is invalid").optional().isString(),
    body("subLocation", "startDate is invalid").optional().isString(),
    body("batteryId", "startDate is invalid").optional().isString(),
    body("customerId", "startDate is invalid").optional().isString(),
    body("timeFrame", "startDate is invalid").optional().isString(),
    body("pageNo", "Email is invalid").toInt(),
    body("pageSize", "Email is invalid").toInt(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { alertType, startDate, endDate, vehicleId, alertName, model, subModel,
            location, subLocation, batteryId, customerId, timeFrame, page, pageSize } = req.body

        const result = await WebAPI.dashFilter({
            alertType, startDate, endDate, vehicleId,
            alertName, model, subModel, location, subLocation, batteryId, customerId, timeFrame, page, pageSize
        })
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/additionalInsight', expressQAsync(secure),
    [body("vehicleId", "startDate is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 3 }),
    body("customerId", "startDate is invalid").optional().isString(),
    body("alertName", "alertName is invalid").isString(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, customerId, alertId, alertName } = req.body
        const updated = await WebAPI.additionalInsight(vehicleId, alertId, alertName, customerId)
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.post('/pastAlerts', expressQAsync(secure),
    [body("vehicleId", "startDate is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 3 }),
    body("customerId", "startDate is invalid").optional().isString(),
    body("alertName", "alertName is invalid").isString(),
    body("pageNo", "Email is invalid").toInt(),
    body("pageSize", "Email is invalid").toInt(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, customerId, alertId, alertName, pageNo, pageSize } = req.body
        const result = await WebAPI.pastAlerts(vehicleId, alertId, alertName, customerId, pageNo, pageSize)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/clearAlert', expressQAsync(secure),
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }),
    body("alertName", "alertName is invalid").isString(),
    body("comment", "comment is invalid").isString(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, comment, alertId, alertName } = req.body
        const result = await WebAPI.clearAlert(vehicleId, alertId, alertName, comment)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/lowMileage', expressQAsync(secure),
    [query("vehicleId", "vehicleId is invalid").optional().isString(),
    query('alertId', "alertId is too short").toInt().isLength({ min: 1 }),
    query("alertName", "alertName is invalid").isString(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId, alertName } = req.query as any
        const result = await WebAPI.lowMileageGraph(vehicleId, alertId, alertName)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/batteryCell', expressQAsync(secure),
    [query("vehicleId", "vehicleId is invalid").optional().isString(),
    query('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.query as any
        const result = await WebAPI.batteryCellGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/vehicleUsage', expressQAsync(secure),
    [query("vehicleId", "vehicleId is invalid").optional().isString(),
    query('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.query as any
        const result = await WebAPI.vehicleUsageGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/batteryTemp', expressQAsync(secure),
    [query("vehicleId", "vehicleId is invalid").optional().isString(),
    query('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.query as any
        const result = await WebAPI.batteryTempGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/unitVoltage', expressQAsync(secure),
    [query("vehicleId", "vehicleId is invalid").optional().isString(),
    query('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.query as any
        const result = await WebAPI.unitVoltageGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/chargingTemp', expressQAsync(secure),
    [query("vehicleId", "vehicleId is invalid").optional().isString(),
    query('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.query as any
        const result = await WebAPI.chargingTempGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/chargingCurrent', expressQAsync(secure),
    [query("vehicleId", "vehicleId is invalid").optional().isString(),
    query('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.query as any
        const result = await WebAPI.chargingCurrentGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/highSoc', expressQAsync(secure),
    [query("vehicleId", "vehicleId is invalid").optional().isString(),
    query('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.query as any
        const result = await WebAPI.highSocGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/betteryTempDiff', expressQAsync(secure),
    [query("vehicleId", "vehicleId is invalid").optional().isString(),
    query('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.query as any
        console.log(req.query);
        const result = await WebAPI.batteryTempDiffGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/speedGraph', expressQAsync(secure),
    [query("vehicleId", "vehicleId is invalid").optional().isString(),
    query('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.query as any
        const result = await WebAPI.speedGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.use(expressErrorHandler);


export default app;