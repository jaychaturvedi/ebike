import * as Express from "express";
import { validationResult, body, query, param } from "express-validator";
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
    // console.log("webapp req secure", req);
    next();
}

function expressErrorHandler(
    err: Error,
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
) {
    res.status(500).json(err);
    return
}

//dashboard main alerts
app.post('/mainAlerts',
    [body('alertType', "alertType is too short").isString().isLength({ min: 1 }),
    body("pageNo", "pageNo is invalid").toInt(),
    body("pageSize", "pageSize is invalid").toInt(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { alertType, pageNo, pageSize } = req.body
        console.log("Start zelp API", new Date())
        const updated = await WebAPI.mainAlerts(alertType, pageNo, pageSize)
        const response = createResponse("OK", updated, undefined)
        console.log("End zelp API", new Date())
        res.json(response)
    })
)
//
app.post('/totalAlerts',
    [body('alertType', "alertType is too short").isString().isLength({ min: 1 }),
    body("startDate", "startDate is invalid").isString(),
    body("endDate", "endDate is invalid").isString(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { alertType, startDate, endDate } = req.body
        const updated = await WebAPI.totalAlerts(alertType, startDate, endDate)
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.post('/topFive',
    [body('alertType', "alertType is too short").isString().isLength({ min: 1 }),
    body("startDate", "startDate is invalid").isString(),
    body("endDate", "endDate is invalid").isString(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { alertType, startDate, endDate } = req.body
        const updated = await WebAPI.topFiveAlert(alertType, startDate, endDate)
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.post('/locationWise',
    [body('alertType', "alertType is too short").isString().isLength({ min: 1 }),
    body("startDate", "startDate is invalid").isString(),
    body("endDate", "endDate is invalid").isString(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { alertType, startDate, endDate } = req.body
        const updated = await WebAPI.locationWiseAlert(alertType, startDate, endDate)
        const response = createResponse("OK", updated, undefined)
        res.json(response)
    })
)

app.post('/dashFilter',
    [body('alertType', "alertType is too short").optional().isString().isLength({ min: 1 }),
    body("alertName", "alertName is invalid").optional().isString(),
    body("startDate", "startDate is invalid").optional().isString(),
    body("endDate", "endDate is invalid").optional().isString(),
    body("model", "model is invalid").optional().isString(),
    body("subModel", "subModel is invalid").optional().isString(),
    body("location", "location is invalid").optional().isString(),
    body("subLocation", "subLocation is invalid").optional().isString(),
    body("batteryId", "batteryId is invalid").optional().isString(),
    body("customerId", "customerId is invalid").optional().isString(),
    body("timeFrame", "timeFrame is invalid").optional().isString(),
    body("pageNo", "pageNo is invalid").toInt(),
    body("pageSize", "pageSize is invalid").toInt(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { alertType, startDate, endDate, vehicleId, alertName, model, subModel,
            location, subLocation, batteryId, customerId, timeFrame, pageNo, pageSize } = req.body

        const result = await WebAPI.dashFilter({
            alertType, startDate, endDate, vehicleId,
            alertName, model, subModel, location, subLocation, batteryId, customerId, timeFrame, pageNo, pageSize
        })
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/additionalInsight',
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body("customerId", "customerId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }),
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

app.post('/pastAlerts',
    [body("vehicleId", "vehicleId is invalid").isString().isLength({ min: 1 }),
    body("customerId", "customerId is invalid").optional().isString(),
    body('alertId', "alertId is too short").optional().toInt(),
    body("alertName", "alertName is invalid").isString().isLength({ min: 1 }),
    body("pageNo", "pageNo is invalid").toInt(),
    body("pageSize", "pageSize is invalid").toInt(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, customerId, alertId, alertName, pageNo, pageSize } = req.body
        const result = await WebAPI.pastAlerts(vehicleId, alertId, alertName, customerId, pageNo, pageSize)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/clearAlert',
    [body("vehicleId", "vehicleId is invalid").isString().isLength({ min: 1 }),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }),
    body("alertName", "alertName is invalid").isString().isLength({ min: 1 }),
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

app.get('/lowMileage',
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
app.get('/graphs',
    [query("vehicleId", "vehicleId is invalid").isString().isLength({ min: 1 }),
    query('alertTypeId', "alertTypeId is too short").toInt(),
    query('alertId', "alertId is too short").toInt(),
    query('alertName', "alertName is too short").isString().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId, alertName, alertTypeId } = req.query as any
        const result = await WebAPI.getDynamicSubGraph(vehicleId, alertId, alertTypeId, alertName)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.get('/alertDetails/:alertId',
    [param('alertId', "alertId is too short").toInt(), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const result = await WebAPI.getAlertDetails(req.params.alertId as any as number)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)


app.post('/batteryCell', expressQAsync(secure),
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.body
        const result = await WebAPI.batteryCellGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/vehicleUsage', expressQAsync(secure),
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.body
        const result = await WebAPI.vehicleUsageGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/batteryTemp', expressQAsync(secure),
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.body
        const result = await WebAPI.batteryTempGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/unitVoltage', expressQAsync(secure),
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.body
        const result = await WebAPI.unitVoltageGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/chargingTemp', expressQAsync(secure),
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.body
        const result = await WebAPI.chargingTempGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/chargingCurrent', expressQAsync(secure),
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.body
        const result = await WebAPI.chargingCurrentGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/highSoc', expressQAsync(secure),
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.body
        const result = await WebAPI.highSocGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/betteryTempDiff', expressQAsync(secure),
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.body
        console.log(req.body);
        const result = await WebAPI.batteryTempDiffGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.post('/speedGraph', expressQAsync(secure),
    [body("vehicleId", "vehicleId is invalid").optional().isString(),
    body('alertId', "alertId is too short").toInt().isLength({ min: 1 }), validate],
    expressQAsync(async (req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction) => {
        const { vehicleId, alertId } = req.body
        const result = await WebAPI.speedGraph(vehicleId, alertId)
        const response = createResponse("OK", result, undefined)
        res.json(response)
    })
)

app.use(expressErrorHandler);


export default app;