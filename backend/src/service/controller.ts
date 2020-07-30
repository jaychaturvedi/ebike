import { IssuesError, BikeError, BadRequestError } from "../error"
import Sequelize from 'sequelize';
import Issues from "./service";
const Op = Sequelize.Op

export async function createIssues(uid: string, comments: string) {
    const issue = await Issues.createNew({ uid, comments, status: 0, openTime: Date.now() as any })
    if (!issue) throw new IssuesError("Unable to report ")
    return issue;
}

export async function closeIssues(serviceId: string) {
    const issue = await Issues.updateWhere({ serviceId }, { status: 1, closeTime: Date.now() as any })
    if (!issue) throw new IssuesError("Unable to report ")
    return issue;
}

