import IssuesModel, { TIssue } from "./model"
import { IssuesError } from "../error"
import Ride from "../rides/model";

export default class Issues {

    static async findWhere(condition: any) {
        const issue = await IssuesModel.findOne({ where: { ...condition } })
        if (!issue) throw new IssuesError('Error while finding id');
        return issue
    }

    static async createNew(issue: TIssue) {
        const newissue = await IssuesModel.create(issue)
        if (!newissue) throw new IssuesError("Error while creating")
        return newissue;
    }

    static async deleteWhere(condition: any) {
        const deleted = await IssuesModel.destroy({ where: { ...condition } });
        if (!deleted) throw new IssuesError("Error while deleting id " + condition);
        return deleted
    }

    static async updateWhere(condition: any, issues: TIssue) {
        await Issues.findWhere(condition)
        const [isUpdated, [result]] = await IssuesModel.update(issues,
            {
                where: { ...condition },
                returning: true
            })
        if (!isUpdated) throw new IssuesError("Error while updating ")
        return result;

    }
    static async findAllWhere(condition: any) { // page limit skip
        const issues = await IssuesModel.findAndCountAll({ where: { ...condition } })
        if (!issues) throw new IssuesError("Could not receive any data")
        return issues
    }

    static async paginate(paginate: any, condition: any) {
        const issues = await IssuesModel.findAndCountAll({ ...paginate, where: { ...condition } })
        if (!issues) throw new IssuesError("Unable to find and count");
        return issues
    }

}
