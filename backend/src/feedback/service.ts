import FeedbackModel, { TFeedback} from "./model"

export default class Feedback {

    static async findById(id: number) {
        const feature = await FeedbackModel.findByPk(id)
        if (!feature) throw new Error('Error while finding id'+id);
        return feature
    }

    static async createNew(feature: TFeedback) {
        const newfeature = await FeedbackModel.create(feature)
        if (!newfeature) throw new Error("Error while creating")
        return newfeature;
    }

    static async updateById(id :number,feature: TFeedback){
        await Feedback.findById(id)
        const [isUpdated, [result]] = await FeedbackModel.update(feature, 
            { where: { id },             
            returning : true
        })
        if (!isUpdated) throw new Error("Error while updating " + id)
        return result;

    }

    static async deleteById(id: number) {
        const deleted = await FeedbackModel.destroy({
            where: { id }
        });
        if (!deleted) throw new Error("Error while deleting id "+id);
        return deleted
    }

    static async findAll() { // page limit skip
        const features = await FeedbackModel.findAll()
        if (!features) throw new Error("Could not receive any data")
        return features
    }

}
