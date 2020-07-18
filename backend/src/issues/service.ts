import IssuesModel, { TIssue } from "./model"
import { IssuesError } from "../error"
import Ride from "../rides/model";

export default class Issues {

    static async findById(rideId: string) {
        const issue = await IssuesModel.findOne({ where: { rideId } })
        if (!issue) throw new IssuesError('Error while finding rideId' + rideId);
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

    static async findAll() { // page limit skip
        const issues = await Ride.findAll({ include: [{ model: IssuesModel, attributes: ['rideId', 'comments'] }] })
        if (!issues) throw new IssuesError("Could not receive any data")
        return issues
    }

}
