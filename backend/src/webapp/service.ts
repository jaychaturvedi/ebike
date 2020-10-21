import WebUserModel, { TDashboard } from "./model"
import { BadRequestError } from "../error"


export default class WebUser {

  static async findOne(condition: any) {
    const webUser = await WebUserModel.findOne({
      where: { ...condition },
    })
    if (!webUser) throw new BadRequestError('Unable to find dashboard ');
    return webUser
  }

  static async createNew(webUser: TDashboard) { //change types of userId
    const exists = await WebUserModel.findOne({ where: { dashboardId: webUser.dashboardId } })
    if (exists) throw new BadRequestError('dashboardId already exists');
    const newDashboard = await WebUserModel.create(webUser)
    if (!newDashboard) throw new BadRequestError("Unable to create new dashboard")
    return newDashboard;
  }

  static async updateWhere(condition: any, webUser: TDashboard) {
    console.log(condition);
    await WebUser.findOne(condition)
    const [isUpdated, [result]] = await WebUserModel.update(webUser, {
      where: { ...condition },
      returning: true
    })
    if (!isUpdated) throw new BadRequestError("Unable to update dashboard data")
    return result
  }

  static async deleteWhere(condition: any) {
    const deleted = await WebUserModel.destroy({
      where: { ...condition }
    });
    if (!deleted) throw new BadRequestError("No data available to delete");
    return "successfully deleted dashboardId"
  }

  static async findAll() {
    const webUser = await WebUserModel.findAll({
      attributes: ['dashboardId', 'dashboardName', 'dashboardImageUrl','authorizedGroup']
    })
    return webUser
  }
}
