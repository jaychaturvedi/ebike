import Sequelize from 'sequelize';
import { AlertError } from "../error";
import SmartAlert from "./service";
const Op = Sequelize.Op

export async function findByDate(startDate: string, endDate: string) {
  const condition = { where: { startDate: { [Op.between]: [startDate, endDate] } } };
  const alerts = await SmartAlert.findAll(condition)
  if (!alerts.count) throw new AlertError('No result found within date range');
  return alerts.rows
}

export async function searchById(id: string, limit: number, page: number) {
  const condition = {
    where: {
      [Op.or]: [
        { batteryId: { [Op.like]: `%${id}%` } },
        { customerId: { [Op.like]: `%${id}%` } },
        { vehicleId: { [Op.like]: `%${id}%` } }
      ]
    },
    limit,
    offset: (page - 1) * limit
  }
  const alerts = await SmartAlert.findAll(condition)
  if (!alerts.count) throw new AlertError('No result found within date range');
  return alerts.rows
}
