import { SupportFeatures as FeaturesModel, UserSupportFeatures as UserFeaturesModel, TSupportFeatures, TUserSupportFeatures } from "./model"
import { SupportError } from "../error"

class SupportFeatures {

    static async findById(id: number) {

        const feature = await FeaturesModel.findByPk(id)
        if (!feature) throw new SupportError('Error while finding id' + id);
        return feature
    }


    static async createNew(feature: TSupportFeatures) {

        const newfeature = await FeaturesModel.create(feature)
        if (!newfeature) throw new SupportError("Error while creating")
        return newfeature;
    }

    static async updateById(id: number, feature: TSupportFeatures) {

        await SupportFeatures.findById(id)
        const [isUpdated, [result]] = await FeaturesModel.update(feature,
            {
                where: { id },
                returning: true
            })
        if (!isUpdated) throw new SupportError("Error while updating " + id)
        return result;

    }

    static async deleteById(id: number) {

        const deleted = await FeaturesModel.destroy({
            where: { id }
        });
        if (!deleted) throw new SupportError("Error while deleting id " + id);
        return deleted
    }

    static async findAll() { // page limit skip

        const features = await FeaturesModel.findAll()
        if (!features) throw new SupportError("Could not receive any data")
        return features
    }

}




class UserSupportFeatures {

    static async findById(id: number) {
        const feature = await UserFeaturesModel.findByPk(id)
        if (!feature) throw new SupportError('Error while finding id ' + id);
        return feature
    }


    static async createNew(feature: TUserSupportFeatures) {

        const newfeature = await UserFeaturesModel.create(feature)
        if (!newfeature) throw new SupportError("Error while creating");
        return newfeature;
    }

    static async updateById(id: number, feature: TUserSupportFeatures) {

        await UserSupportFeatures.findById(id)
        const [isUpdated, [result]] = await UserFeaturesModel.update(feature, {
            where: { id },
            returning: true
        })
        if (!isUpdated) throw new SupportError("Error while updating id " + id)
        return result;
    }

    static async deleteById(id: number) {

        const deleted = await UserFeaturesModel.destroy({
            where: { id }
        });
        if (!deleted) throw new SupportError("Error while deleting id " + id);
        return deleted
    }

    static async findAll() {

        const userFeatures = await UserFeaturesModel.findAll()
        if (!userFeatures) throw new SupportError("Could not receive any data")
        return userFeatures
    }

}

export { SupportFeatures , UserSupportFeatures }