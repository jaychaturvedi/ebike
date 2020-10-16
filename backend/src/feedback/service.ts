import FeedbackModel, { TFeedback } from "./model"
import { FeedbackError } from "../error"

export default class Feedback {

    static async findById(rideId: string) {
        const feature = await FeedbackModel.findOne({ where: { rideId } })
        if (!feature) throw new FeedbackError('No data available');
        return feature
    }

    static async createNew(feature: TFeedback) {
        const newfeature = await FeedbackModel.create(feature)
        if (!newfeature) throw new FeedbackError("Feedback was not created")
        return newfeature;
    }

    static async updateById(rideId: string, feature: TFeedback) {
        await Feedback.findById(rideId)
        const [isUpdated, [result]] = await FeedbackModel.update(feature,
            {
                where: { rideId },
                returning: true
            })
        if (!isUpdated) throw new FeedbackError("No data to update")
        return result;

    }

    static async deleteById(rideId: string) {
        const deleted = await FeedbackModel.destroy({
            where: { rideId }
        });
        if (!deleted) throw new FeedbackError("Error while deleting data");
        return deleted
    }

    static async findAll() { // page limit skip
        const features = await FeedbackModel.findAll()
        if (!features) throw new FeedbackError("Could not find any data")
        return features
    }

}
