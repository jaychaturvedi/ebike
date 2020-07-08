import BikeModel, { TBike } from "./model"
import { BikeError } from "../error"

export default class Bike {

    static async findById(id: number) {
        const bike = await BikeModel.findOne({
            where: { id } })
        if (!bike) throw new BikeError('Unable to find bike by id ' + id);
        return bike

    }

    static async createNew(bike: TBike) { //change types of userId
        const newBike = await BikeModel.create(bike)
        if (!newBike) throw new BikeError("Unable to create new bike")
        return newBike;
    }

    static async updateById(id: number, bike: TBike) {
        await Bike.findById(id)
        const [isUpdated, [result]] = await BikeModel.update(bike, 
            { where: { id },             
            returning : true
        })
        if (!isUpdated) throw new BikeError("Unable to update user with id ")
        return result


    }

    static async deleteById(id: number) {
        const deleted = await BikeModel.destroy({
            where: { id } });
        if (!deleted ) throw new BikeError("Unable to delete user with id " + id);
        return deleted
        
    }

    static async findAll() { // todo limit and skip, pagination
        const bikes = await BikeModel.findAll()
        return bikes

    }

}
