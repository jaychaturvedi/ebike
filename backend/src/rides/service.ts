import RideModel, { TRide } from "./model"
import Bike from "../bike/model";
import { RideError } from "../error"


export default class Ride {

    static async findById(id: number) {
        const ride = await RideModel.findOne({
            where: { id }
        })
        if (!ride) throw new RideError('Unable to find by id ' + id);
        return ride

    }

    static async createNew(ride: TRide) { //change types of userId
        const newride = await RideModel.create(ride)
        if (!newride) throw new RideError("Unable to create new")
        return newride;
    }

    static async updateWhere(condition: any, ride: TRide) {
        await Ride.findAll(condition)
        const [isUpdated, [result]] = await RideModel.update(ride,
            {
                ...condition,
                returning: true
            })
        if (!isUpdated) throw new RideError("Unable to update with id ")
        return result
    }

    static async deleteById(id: number) {
        const deleted = await RideModel.destroy({
            where: { id }
        });
        if (!deleted) throw new RideError("Unable to delete with id " + id);
        return deleted

    }

    static async findAll(condition: any) {
        const rides = await RideModel.findAndCountAll(condition)
        if (!rides) throw new RideError("Unable to find and count");
        return rides
    }

}
