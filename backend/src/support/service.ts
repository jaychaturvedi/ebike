import {Features as FeaturesModel, UserFeatures as UserFeaturesModel, TFeatures, TUserFeatures} from "./model"

class Features {

    static async findById(id: number) {
        const feature = await FeaturesModel.findByPk(id)
        if (!feature) throw new Error('Error while finding id'+id);
        return feature
    }


    static async createNew(feature: TFeatures) {
        const newfeature = await FeaturesModel.create(feature)
        if (!newfeature) throw new Error("Error while creating")
        return newfeature;
    }

    static async updateById(id :number,feature: TFeatures){
        await Features.findById(id)
        const [isUpdated, [result]] = await FeaturesModel.update(feature, 
            { where: { id },             
            returning : true
        })
        if (!isUpdated) throw new Error("Error while updating " + id)
        return result;

    }

    static async deleteById(id: number) {
        const deleted = await FeaturesModel.destroy({
            where: { id }
        });
        if (!deleted) throw new Error("Error while deleting id "+id);
        return deleted
    }

    static async findAll() { // page limit skip
        const features = await FeaturesModel.findAll()
        if (!features) throw new Error("Could not receive any data")
        return features
    }

}




class UserFeatures {

    static async findById(id: number) {
        const feature = await UserFeaturesModel.findByPk(id)
        if (!feature) throw new Error('Error while finding id '+id);
        return feature
    }


    static async createNew(feature: TUserFeatures) {
        const newfeature = await UserFeaturesModel.create(feature)
        if (!newfeature) throw new Error("Error while creating");
        return newfeature;
    }

    static async updateById(id :number,feature: TUserFeatures){
        await UserFeatures.findById(id)
        const [isUpdated, [result]] = await UserFeaturesModel.update(feature, {
                where: { id },             
                returning : true
            })
            if (!isUpdated) throw new Error("Error while updating id "+id)
            return result;
    }

    static async deleteById(id: number) {
        const deleted = await UserFeaturesModel.destroy({
            where: { id }
        });
        if (!deleted) throw new Error("Error while deleting id "+id);
        return deleted
    }

    static async findAll() {
        const userFeatures= await UserFeaturesModel.findAll()
        if (!userFeatures) throw new Error("Could not receive any data")
        return userFeatures

    }

}

export { Features as DbFeatures, UserFeatures as DbUserFeatures}