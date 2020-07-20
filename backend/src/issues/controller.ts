import { IssuesError, BikeError, BadRequestError } from "../error"
import Sequelize from 'sequelize';
import Issues from "./service";
const Op = Sequelize.Op

export async function createIssues(rideId: string, issues: string) {
    const issue = await Issues.createNew({ rideId, issues })
    if (!issue) throw new IssuesError("Unable to report ")
    return issue;
}


