import { IssuesError, BikeError, BadRequestError } from "../error"
import Sequelize from 'sequelize';
import Issues from "./service";
import { pagination } from "../helper";
const Op = Sequelize.Op

export async function createIssues(uid: string, frameId: string, comments: string) {
    const issue = await Issues.createNew({ uid, frameId, comments, status: 0, openTime: Date.now() as any })
    if (!issue) throw new IssuesError("Unable to report ")
    return issue;
}

export async function closeIssues(serviceId: string, status: number) {
    const issue = await Issues.updateWhere({ serviceId }, { status, closeTime: Date.now() as any })
    if (!issue) throw new IssuesError("Unable to report ")
    return issue;
}

export async function paginate(pageNumber: number, pageSize: number, condition: any) {
    let paginate = {}
    if (pageNumber || pageSize) {
        paginate = pagination(pageNumber, pageSize);
    }
    const issues = await Issues.paginate(paginate, condition)
    if (!issues) throw new IssuesError("Unable to find data")
    return issues
}