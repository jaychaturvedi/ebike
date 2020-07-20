import { IssuesError, BikeError, BadRequestError } from "../error"
import Sequelize from 'sequelize';
import Feedback from "./service";
const Op = Sequelize.Op

export async function createFeedback(rideId: string, options: string[], comments?: string) {
    const issue = await Feedback.createNew({ rideId, options, comments })
    if (!issue) throw new IssuesError("Unable to report ")
    return issue;
}


