import BikeModel, { TBike } from "./model"
import { BikeError } from "../error"
import RideModel from "../rides/model";

export default class Bike {

    static async findOne(condition: any) {
        const bike = await BikeModel.findOne({
            where: { ...condition },
        })
        if (!bike) throw new BikeError('Unable to find bike by id ');
        return bike
    }

    static async createNew(bike: TBike) { //change types of userId
        const exists = await BikeModel.findOne({ where: { frameId: bike.frameId } })
        console.log('in service create new bike', exists);
        if (exists) throw new BikeError("frameId already verified")
        const newBike = await BikeModel.create(bike)
        if (!newBike) throw new BikeError("Unable to create new")
        return newBike;
    }

    static async updateWhere(condition: any, bike: TBike) {
        console.log(condition);
        await Bike.findOne(condition)
        const [isUpdated, [result]] = await BikeModel.update(bike, {
            where: { ...condition },
            returning: true
        })
        if (!isUpdated) throw new BikeError("Unable to update with id ")
        return result
    }

    static async deleteWhere(condition: any) {
        const deleted = await BikeModel.destroy({
            where: { ...condition }
        });
        if (!deleted) throw new BikeError("Unable to delete with id " + condition);
        return deleted
    }

    static async findAll() {
        const bikes = await BikeModel.findAll({
            attributes: ['frameId', 'uid'],
            include: [{ model: RideModel, attributes: ['rideId'] }]
        })
        return bikes
    }

    static async pagination(paginate: any, condition: any) {
        const users = await BikeModel.findAndCountAll({ ...paginate, where: { ...condition } })
        if (!users) throw new BikeError("Unable to find and count");
        return users
    }

}
