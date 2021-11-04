import FaqModel, { TFaqQnA } from "./model"
import { SupportError } from "../error"

export default class FaqQnA {

  static async findWhere(condition: any) {
    const upgrade = await FaqModel.findOne({ where: { ...condition } })
    if (!upgrade) throw new SupportError('Error while finding id');
    return upgrade
  }

  static async createNew(upgrade: TFaqQnA) {
    let newUpgrade
    // try{
      newUpgrade = await FaqModel.create(upgrade)
    // } catch(e){
    //   throw new SupportError("You are trying to create duplicate records")
    // }
    if (!newUpgrade) throw new SupportError("Error while creating")
    return newUpgrade;
  }

  static async deleteWhere(condition: any) {
    const deleted = await FaqModel.destroy({ where: { ...condition } });
    if (!deleted) throw new SupportError("Error while deleting id " + condition);
    return deleted
  }

  static async updateWhere(condition: any, upgrade: TFaqQnA) {
    await FaqQnA.findWhere(condition)
    const [isUpdated, [result]] = await FaqModel.update(upgrade,
      {
        where: { ...condition },
        returning: true
      })
    if (!isUpdated) throw new SupportError("Error while updating ")
    return result;

  }
  static async findAllWhere(condition: any) { // page limit skip
    const issues = await FaqModel.findAndCountAll({ where: { ...condition } })
    if (!issues) throw new SupportError("Could not receive any data")
    return issues
  }

  static async findAll() { // page limit skip
    const issues = await FaqModel.findAll({
      attributes: {exclude: ['updatedAt', 'createdAt']},
      order: [['id','ASC']]})
    if (!issues) throw new SupportError("Could not receive any data")
    return issues
  }

  static async paginate(paginate: any, condition: any) {
    const issues = await FaqModel.findAndCountAll({ ...paginate, where: { ...condition } })
    if (!issues) throw new SupportError("Unable to find and count");
    return issues
  }

}
