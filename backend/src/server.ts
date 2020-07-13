import express from 'express';
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

const PORT = process.env.PORT || 5000;
db.sync({ alter: true }).then(() => app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) }))

