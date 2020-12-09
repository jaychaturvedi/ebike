import * as Express from "express";
import { validationResult, body, query, param } from "express-validator";
import { createResponse } from "../helper";
import WebAPI from "../externalApi/webapp";
import { createWebAppUser, deleteWebAppUser } from "./lambdaService";
import { BadRequestError, MotoVoltError } from "../error";
import JwtDecode from "jwt-decode";
import { getEmbedUrl, getQuickSightUrl } from "./getQuickSightUrl";
import Dashboard from './service'


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

function webSecure(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const token = req.headers.authorization as string
  if (!token) throw new BadRequestError("No token in header")
  const { email } = JwtDecode(token)
  res.locals.user = { email, idToken: token }
  console.log(res.locals.user);
  next()
}

function expressErrorHandler(
  err: Error,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const response = createResponse("ERROR", undefined, {
    code: (err as MotoVoltError).errorCode,
    name: err.name,
    message: err.message
  })
  res.status(200)
  return res.json(response);
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
    const totalAlerts = await WebAPI.totalAlerts(alertType, startDate, endDate)
    const response = createResponse("OK", {data:totalAlerts}, undefined)
    const errorMessage = {
      "errorMessage":"request timed out after 30seconds"
    }
    console.log(totalAlerts);
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
  body("vehicleID", "vehicleID is invalid").optional().isString(),
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
    const { alertType, startDate, endDate, vehicleID, alertName, model, subModel,
      location, subLocation, batteryId, customerId, timeFrame, pageNo, pageSize } = req.body

    const result = await WebAPI.dashFilter({
      alertType, startDate, endDate, vehicleID,
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
    const { vehicleId, alertId, alertName, pageNo, pageSize } = req.body
    const result = await WebAPI.pastAlerts(vehicleId, alertId, alertName, pageNo, pageSize)
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
  [query("vehicleId", "vehicleId is invalid").isString(),
  query('alertTypeId', "alertTypeId is too short").toInt(),
  query('alertId', "alertId is too short").toInt(),
  query('alertName', "alertName is too short").isString(),
  query('alertCode', "alertCode is too short").isString(),
  query('timeStamp', "timeStamp is too short").isString(), validate],
  expressQAsync(async (req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction) => {
    console.log("Start API :", new Date())
    const { vehicleId, alertId, alertName, alertTypeId, timeStamp, alertCode } = req.query as any
    const result = await WebAPI.getDynamicSubGraph(vehicleId, alertId, alertTypeId, alertName, timeStamp, alertCode)
    const response = createResponse("OK", result, undefined)
    console.log("End API :", new Date())
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

app.post('/search',
  [body('frameId', "frameId is required").isString(),
  body('pageNo', "pageNo is required").toInt(),
  body('pageSize', "pageSize is required").toInt(), validate],
  expressQAsync(async (req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction) => {
    const { pageNo, pageSize, frameId } = req.body as any
    const result = await WebAPI.vehicleSearch(frameId as string
      , pageSize as number, pageNo as number)
    const response = createResponse("OK", result, undefined)
    res.json(response)
  })
)

app.post('/createUser',
  [body('userEmail', "userEmail is required").isString(),
  body('userRole', "userRole is required").isString(),
  body('password', "password is required").isString(), validate],
  expressQAsync(async (req: Express.Request, res: Express.Response,
    next: Express.NextFunction) => {
    const { userRole, password, userEmail } = req.body as any
    const result = await createWebAppUser({
      userEmail,
      userRole,
      password
    })
    const response = createResponse("OK", result.response, result.err)
    res.json(response)
  })
)

app.delete('/deleteUser',
  [body('userEmail', "userEmail is required").isString(), validate],
  expressQAsync(async (req: Express.Request, res: Express.Response,
    next: Express.NextFunction) => {
    const { userEmail } = req.body as any
    const result = await deleteWebAppUser({ userEmail })
    const response = createResponse("OK", result.response, result.err)
    res.json(response)
  })
)

app.post('/quicksight', expressQAsync(webSecure),
  [body('dashboardId', "dashboardId is too short").isString(), validate],
  expressQAsync(async (req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction) => {
    const { email, idToken } = res.locals.user
    // DashboardId: "e3cf1a0d-04f4-442b-8276-a359cada2b32",
    const dashboardId = req.body.dashboardId as string
    const result = await getEmbedUrl(idToken, email, dashboardId)
    const response = createResponse("OK", result, undefined)
    res.json(response)
  })
)

app.get('/getDashboard',
  expressQAsync(async (req: Express.Request, res: Express.Response,
    next: Express.NextFunction) => {
    const result = await Dashboard.findAll()
    const response = createResponse("OK", result, undefined)
    res.json(response)
  })
)

app.post('/createDashboard',
  [body('dashboardId', "dashboardId is required").isString(),
  body('dashboardName', "dashboardName is required").isString(),
  body('dashboardImageUrl', "dashboardImageUrl is required").isString(),
  body('authorizedGroup', "authorizedGroup is an array required")
    .isArray().isLength({ min: 1 }), validate],
  expressQAsync(async (req: Express.Request, res: Express.Response,
    next: Express.NextFunction) => {
    const { dashboardId, dashboardName,
      dashboardImageUrl, authorizedGroup } = req.body as any
    const result = await Dashboard.createNew(
      { dashboardId, dashboardName, dashboardImageUrl, authorizedGroup }
    )
    const response = createResponse("OK", result, undefined)
    res.json(response)
  })
)

app.post('/updateDashboard',
  [body('dashboardId', "dashboardId is required").isString(),
  body('dashboardName', "dashboardName is required").isString(),
  body('dashboardImageUrl', "dashboardImageUrl is required").isString(),
  body('authorizedGroup', "authorizedGroup is an array required")
    .isArray().isLength({ min: 1 }), validate],
  expressQAsync(async (req: Express.Request, res: Express.Response,
    next: Express.NextFunction) => {
    const { dashboardId, dashboardName,
      dashboardImageUrl, authorizedGroup } = req.body as any
    const result = await Dashboard.updateWhere({ dashboardId },
      { dashboardName, dashboardImageUrl, authorizedGroup })
    const response = createResponse("OK", result, undefined)
    res.json(response)
  })
)

app.delete('/deleteDashboardId/:dashboardId',
  [param('dashboardId', "dashboardId is required").isString().isLength({ min: 1 }), validate],
  expressQAsync(async (req: Express.Request, res: Express.Response,
    next: Express.NextFunction) => {
    const dashboardId = req.params.dashboardId as string
    const result = await Dashboard.deleteWhere({ dashboardId })
    const response = createResponse("OK", result, undefined)
    res.json(response)
  })
)


app.get('/customerLiveLocation/:customerId',
  [param('customerId', "customerId is too short").isString(),
  query('location', "location is too short").isString(),
  query('zone', "zone is too short").isString(), validate],
  expressQAsync(async (req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction) => {
    const { location, zone } = req.query as any
    const result = await WebAPI.getCustomerLiveLocations(
      req.params.customerId as string,
      location,
      zone)
    // if (result[0].st==="false"){
    //   throw new BadRequestError("No data available for customerId")
    // }
    const response = createResponse("OK", result, undefined)
    res.json(response)
  })
)
/////////api to give vehicle filter option and location filter option in subheader of webapp////////////////
app.get('/dropdownFilters',
  expressQAsync(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const result = await WebAPI.getDropdownFilters()
    const response = createResponse("OK", result, undefined)
    res.json(response)
  })
)
app.get('/mapViewFilters',
  expressQAsync(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const result = await WebAPI.getMapViewDropdownFilters()
    const response = createResponse("OK", result, undefined)
    res.json(response)
  })
)

app.use(expressErrorHandler);


export default app;