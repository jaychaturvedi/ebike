import express from 'express';
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import serverless from "serverless-http";
import userRoutes from './user/routes'
import bikeRoutes from './bike/routes'
import issuesRoutes from './issues/routes'
import supportRoutes from "./support/routes";
import feedbackRoutes from "./feedback/routes";
import ridesRoutes from "./rides/routes";
import featuresRoutes from "./features/routes";
import cors from 'cors';
import * as dotenv from "dotenv"
import * as bodyparser from 'body-parser';
import db from "./db"
import User from './user/service';
dotenv.config()

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use("/user", userRoutes)
app.use("/bike", bikeRoutes)
app.use("./features", featuresRoutes)
app.use("/feedback", feedbackRoutes)
app.use("/rides", ridesRoutes)
app.use("/issues", issuesRoutes)
app.use("/support", supportRoutes)

const PORT = Number(process.env.PORT) || 5000;
db.sync({ force: true }).then(() => app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) }))

// deploy express app to aws lambda
// const handler = serverless(app);
// module.exports.handler = async (event: APIGatewayProxyEvent, context: Context) => {
//     // you can do other things here
//     console.log("context", context, "event", event);
//     context.callbackWaitsForEmptyEventLoop = false;
//     try {
//         db.authenticate()
//         console.log("connection ok")
//     } catch (error) {
//         console.log("connecting")
//         await db.sync({ alter: true, force: false });
//     }
//     const result = await handler(event, context);
//     // and here
//     return result;
// };


// //will be pushed other file
// //lambda function to be triggered to create new user
module.exports.createUser = async (event: APIGatewayProxyEvent, context: Context) => {
    // you can do other things here
    const body = JSON.parse(event.body!)
    const uid = body.uid as string
    const phone = body.phoneNumber as string
    console.log("new user", { uid: uid, phone: phone })
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        db.authenticate()
        console.log("connection ok")
    } catch (error) {
        console.log("connecting")
        await db.sync({ alter: true, force: false });
    }
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

