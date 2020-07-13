import BikeModel, { TBike } from "./model"
import { BikeError } from "../error"
import { TBikeDetails } from "../externalApi/motovolt";
import { TFilter } from "../user/service";

export default class Bike {

    static async findByFrame(frameId: string) {
        const bike = await BikeModel.findOne({
            where: { frameId }
        })
        if (!bike) throw new BikeError('Unable to find bike by id ' + frameId);
        return bike
    }

    static async createNew(bike: TBike) { //change types of userId
        const newBike = await BikeModel.create(bike)
        if (!newBike) throw new BikeError("Unable to create new")
        return newBike;
    }

    static async updateByFrame(frameId: string, bike: TBike) {
        await Bike.findByFrame(frameId)
        const [isUpdated, [result]] = await BikeModel.update(bike, {
            where: { frameId },
            returning: true
        })
        if (!isUpdated) throw new BikeError("Unable to update with id ")
        return result
    }

    static async deleteByFrame(frameId: number) {
        const deleted = await BikeModel.destroy({
            where: { frameId }
        });
        if (!deleted) throw new BikeError("Unable to delete with id " + frameId);
        return deleted
    }

    static async findAll() {
        const bikes = await BikeModel.findAll()
        return bikes
    }

    static async findAndCountAll(paginate: any, where: any) {
        const users = await BikeModel.findAndCountAll({ ...paginate, where })
        if (!users) throw new BikeError("Unable to find and count");
        return users
    }

}
