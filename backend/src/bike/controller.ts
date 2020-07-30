import { UserError, BikeError, BadRequestError } from "../error"
import ConnectmApi from '../externalApi/motovolt'
import User, { TFilter } from "../user/service"
import Sequelize from 'sequelize';
import Bike from "./service";
import { pagination, filters } from "../helper";
const Op = Sequelize.Op

export async function getMyBike(uid: string) {
  const { frameId } = await User.findByUid(uid)
  const { mtrper: motorPer, batchrgper: batteryChargePer, batid: batteryId,
    bathltper: batteryHealthPer, vehid: vehicleId, model, type,
    servDate: serviceDate } = await ConnectmApi.getMyBike(frameId as string);
  return { motorPer, batteryChargePer, batteryHealthPer, batteries: { id: batteryId }, vehicleId, serviceDate }
}

export async function getHomeSreen(frameId: string,) {
  const { co2sav, totdist: totalDistance, rats: ratings, petlsav: petrolSaved,
    grnmls: greenMiles, costrcv: costRecovered } =
    await ConnectmApi.getBikeStat(frameId as string)
  const { type } =
    await ConnectmApi.getMyBike(frameId as string)// get bike types cellular or internet
  const { batchrgper: batteryCharge, rngcvr: rangeCovered,
    rngavail: rangeAvailable, ign: ignition, lc: locked, prom: promotion, noty: notification } =
    await ConnectmApi.getBikeLiveData(frameId as string)//get LiveBikeData
  return {
    co2sav, totalDistance, ratings, petrolSaved, type, greenMiles, costRecovered,
    batteryCharge, rangeCovered, rangeAvailable, ignition, locked, promotion, notification
  }
}

export async function verifyFrame(uid: string, frameId: string) {
  const { model, vehid: vehicleId, st: status } = await ConnectmApi.getMyBike(frameId as string); //update all fields
  if (status) throw new BadRequestError("Cant get details")
  const user = await User.findByUid(uid)
  if (user.frameId) throw new UserError("frameId already verified")
  await User.updateByUid(uid, { frameId, model, vehicleId })
  const bike = await Bike.createNew({ frameId, model, uid })
  return bike;
}

export async function paginateBike(filter: TFilter) {
  const { pageNumber, pageSize } = filter
  delete filter.pageNumber; delete filter.pageSize
  let paginate = {}
  if (pageNumber || pageSize) {
    paginate = pagination(pageNumber!, pageSize!);
  }
  const where = filters(filter)
  const bikes = await Bike.findAndCountAll(paginate, where)
  if (!bikes) return 0
  return bikes
}

