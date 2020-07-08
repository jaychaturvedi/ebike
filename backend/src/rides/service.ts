import RideModel, {TRide} from "./model"
import Bike from "../bike/model";
import { BikeError } from "../error"


export default class Ride {

    static async findById(id: number) {
        const ride = await RideModel.findOne({
            where: { id } })
        if (!ride) throw new BikeError('Unable to find by id ' + id);
        return ride

    }

    static async createNew(ride: TRide) { //change types of userId
        const newride = await RideModel.create(ride)
        if (!newride) throw new BikeError("Unable to create new")
        return newride;
    }

    static async updateById(id: number, ride: TRide) {
        await Ride.findById(id)
        const [isUpdated, [result]] = await RideModel.update(ride, 
            { where: { id },             
            returning : true
        })
        if (!isUpdated) throw new BikeError("Unable to update with id ")
        return result
    }

    static async deleteById(id: number) {
        const deleted = await RideModel.destroy({
            where: { id } });
        if (!deleted ) throw new BikeError("Unable to delete with id " + id);
        return deleted
        
    }

    static async findAll() { // todo limit and skip, pagination
        const rides = await RideModel.findAll()
        return rides

    }

}
