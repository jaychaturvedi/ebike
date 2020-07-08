import IssuesModel, { TIssue} from "./model"
import { IssuesError } from "../error"

export default class Issues {

    static async findById(id: number) {

        const issue = await IssuesModel.findByPk(id)
        if (!issue) throw new IssuesError('Error while finding id'+id);
        return issue
    }

    static async createNew(feature: TIssue) {

        const newissue = await IssuesModel.create(feature)
        if (!newissue) throw new IssuesError("Error while creating")
        return newissue;
    }

    static async updateById(id :number,feature: TIssue){

        await Issues.findById(id)
        const [isUpdated, [result]] = await IssuesModel.update(feature, 
            { where: { id },             
            returning : true
        })
        if (!isUpdated) throw new IssuesError("Error while updating " + id)
        return result;

    }

    static async deleteById(id: number) {

        const deleted = await IssuesModel.destroy({
            where: { id }
        });
        if (!deleted) throw new IssuesError("Error while deleting id "+id);
        return deleted
    }

    static async findAll() { // page limit skip
        
        const issues = await IssuesModel.findAll()
        if (!issues) throw new IssuesError("Could not receive any data")
        return issues
    }

}
