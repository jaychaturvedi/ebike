import UpgradesModel, { TUpgrade } from "./model"
import { SupportError } from "../error"

export default class Upgrades {

  static async findWhere(condition: any) {
    const upgrade = await UpgradesModel.findOne({ where: { ...condition } })
    if (!upgrade) throw new SupportError('Error while finding id');
    return upgrade
  }

  static async createNew(upgrade: TUpgrade) {
    let newUpgrade
    try{
      newUpgrade = await UpgradesModel.create(upgrade)
    } catch(e){
      throw new SupportError("You are trying to create duplicate records")
    }
    // if (!newUpgrade) throw new SupportError("Error while creating")
    return newUpgrade;
  }

  static async deleteWhere(condition: any) {
    const deleted = await UpgradesModel.destroy({ where: { ...condition } });
    if (!deleted) throw new SupportError("Error while deleting id " + condition);
    return deleted
  }

  static async updateWhere(condition: any, upgrade: TUpgrade) {
    await Upgrades.findWhere(condition)
    const [isUpdated, [result]] = await UpgradesModel.update(upgrade,
      {
        where: { ...condition },
        returning: true
      })
    if (!isUpdated) throw new SupportError("Error while updating ")
    return result;

  }
  static async findAllWhere(condition: any) { // page limit skip
    const issues = await UpgradesModel.findAndCountAll({ where: { ...condition } })
    if (!issues) throw new SupportError("Could not receive any data")
    return issues
  }
  static async findAll() { // page limit skip
    const issues = await UpgradesModel.findAll({
      attributes: {exclude: ['updatedAt', 'createdAt', 'id']},
      order: [['id','ASC']]})
    if (!issues) throw new SupportError("Could not receive any data")
    return issues
  }

  static async paginate(paginate: any, condition: any) {
    const issues = await UpgradesModel.findAndCountAll({ ...paginate, where: { ...condition } })
    if (!issues) throw new SupportError("Unable to find and count");
    return issues
  }

}
