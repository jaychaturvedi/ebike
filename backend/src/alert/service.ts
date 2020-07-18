import SmartAlertModel, { TSmartAlert } from "./model"
import { IssuesError, AlertError } from "../error"
import Sequelize from 'sequelize';
const Op = Sequelize.Op

export default class SmartAlert {

  static async findByDate(startDate: string, endDate: string) {
    const where = {
      startDate: {
        [Op.between]: [startDate, endDate],
      },
    };
    const alerts = await SmartAlertModel.findAndCountAll({ where })
    if (!alerts) throw new AlertError("Unable to find and count");
    return alerts
  }

  static async findByLocation(location: string) {
    const alerts = await SmartAlertModel.findAndCountAll({ where: { location } })
    if (!alerts) throw new AlertError("Unable to find and count");
    return alerts
  }

  static async findByModel(model: string) {
    const alerts = await SmartAlertModel.findAndCountAll({ where: { model } })
    if (!alerts) throw new AlertError("Unable to find and count");
    return alerts
  }

  static async findAll(condition: any) {
    const alerts = await SmartAlertModel.findAndCountAll(condition)
    if (!alerts) throw new AlertError("Unable to find and count");
    return alerts
  }



}
