import RideModel, { TRide } from "./model"
import Bike from "../bike/model";
import { RideError } from "../error"
import Issues from "../service/model";
import FeedbackModel from "../feedback/model";

export default class Ride {

    static async findOneWhere(condition: any) {
        const ride = await RideModel.findOne({ where: { ...condition } })
        if (!ride) throw new RideError('Unable to find the ride ');
        return ride
    }

    static async createNew(ride: TRide) { //change types of userId
        const exists = await RideModel.findOne({ where: { rideId: ride.rideId } })
        if (exists) throw new RideError('rideId already exists');
        const newride = await RideModel.create(ride)
        if (!newride) throw new RideError("Ride already exists")
        return newride;
    }

    static async updateWhere(condition: any, ride: TRide) {
        await Ride.findOneWhere(condition)
        const [isUpdated, [result]] = await RideModel.update(ride,
            {
                where: { ...condition },
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

    static async findAll() {
        const rides = await RideModel.findAndCountAll({ include: [{ model: FeedbackModel }] })
        if (!rides) throw new RideError("Unable to find and count");
        return rides
    }

}
