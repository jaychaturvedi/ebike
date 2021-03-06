import express from 'express';
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import serverless from "serverless-http";
import userRoutes from './user/routes'
import bikeRoutes from './bike/routes'
import serviceRoutes from './service/routes'
import feedbackRoutes from "./feedback/routes";
import ridesRoutes from "./rides/routes";
import featureRoutes from "./features/routes";
import faqQnARoutes from "./faqQnA/routes";
import faqRoutes from './faq/routes'
import cors from 'cors';
import * as dotenv from "dotenv"
import * as bodyparser from 'body-parser';
import db from "./db"
import User from './user/service';
import webappRoutes from "./webapp/routes"
dotenv.config()

const app = express();
app.use(cors());
// app.options('/*', cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json());
app.use("/user", userRoutes)
app.use("/bike", bikeRoutes)
app.use("/feedback", feedbackRoutes)
app.use("/ride", ridesRoutes)
app.use("/service", serviceRoutes)
app.use("/feature", featureRoutes)
app.use("/faq", faqRoutes)
app.use("/qna", faqQnARoutes)
app.use("/webapp", webappRoutes)
const PORT = Number(process.env.SPORT) || 5000;
db.sync({ alter: true }).then(() => app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) }))

module.exports.handler = async (event: APIGatewayProxyEvent, context: Context) => {
    console.log("context", context, "\nevent", event);
    app.use("/user", userRoutes)
    app.use("/bike", bikeRoutes)
    app.use("/feedback", feedbackRoutes)
    app.use("/ride", ridesRoutes)
    app.use("/service", serviceRoutes)
    app.use("/feature", featureRoutes)
    app.use("/faq", faqRoutes)
    app.use("/qna", faqQnARoutes)
    app.use("/webapp", webappRoutes)
    const handler = serverless(app)
    try {
        await db.authenticate();
    } catch (error) {
        await db.sync({ alter: true, force: false });
    }
    const result = await handler(event, context);
    return result;
};

// will be pushed other file
// lambda function to be triggered to create new user
module.exports.createUser = async (event: APIGatewayProxyEvent, context: Context) => {
    const body = JSON.parse(event.body!)
    const uid = body.uid as string
    const phone = body.phoneNumber as string
    console.log("new user", { uid: uid, phone: phone })
    context.callbackWaitsForEmptyEventLoop = false;
    console.log("connecting for CreateUser")
    await db.sync({ alter: true, force: false });
    const newUser = await User.createNew({ uid: uid, phone: phone })
    console.log(newUser);
    const response = {
        statusCode: 200,
        headers: {
            "x-custom-header": "user_creation"
        },
        body: JSON.stringify({ uid: uid, phone: phone }),
        isBase64Encoded: false
    };
    context.succeed(response)
};

module.exports.webapp = async (event: APIGatewayProxyEvent, context: Context) => {
    // context.callbackWaitsForEmptyEventLoop = false;
    app.use("/webV1", webappRoutes)
    const webapp = serverless(app);
    console.log("connecting")
    try {
        await db.authenticate()
        console.log("connection ok")
    } catch (error) {
        console.log("connecting")
        await db.sync({ alter: true, force: false });
    }
    console.log("Start Result", new Date())
    const result = await webapp(event, context);
    console.log("Return Result ", new Date())
    return result;
};