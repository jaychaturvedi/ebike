import { UserError, BikeError, BadRequestError } from "../error"
import ConnectmApi from '../externalApi/motovolt'
import User, { TFilter } from "../user/service"
import Sequelize from 'sequelize';
import Bike from "./service";
import { pagination, filters } from "../helper";
const Op = Sequelize.Op

export async function getMyBike(frameId: string) {
  const result = await Promise.all([ConnectmApi.getMyBike(frameId as string), Bike.findOne({ frameId })])
  const { fid, mtrper: motorPer, batchrgper: batteryChargePer, batid: batteryId,
    bathltper: batteryHealthPer, vehid: vehicleId, model, type,
    servDate: serviceDate, warrantyValidTill, purchaseDate } = result[0]
  if (!fid) throw new BikeError("frameId is not registered");
  const { bikeName } = result[1]
  return {
    bikeName, motorPer, batteryChargePer, batteryHealthPer, model, type,
    batteries: [{ id: batteryId }], vehicleId, serviceDate, warrantyValidTill, purchaseDate
  }
}

export async function homeScreen(frameId: string,) {
  const [bikeStat, myBike, bikeLiveData] = await Promise.all([
    ConnectmApi.getBikeStat(frameId as string),
    ConnectmApi.getMyBike(frameId as string),
    ConnectmApi.getBikeLiveData(frameId as string)])
  const { type } = myBike
  const { co2sav, totdist: totalDistance, rats: ratings, petlsav: petrolSaved,
    grnmls: greenMiles, costrcv: costRecovered } = bikeStat //get bike status
  const { batchrgper: batteryCharge, rngcvr: rangeCovered,
    rngavail: rangeAvailable, ign: ignition, lc: locked, prom: promotion, noty: notification } = bikeLiveData //get bike live data
  if (bikeLiveData.st || bikeStat.st || myBike.st) throw new BikeError("Please check valid frameId")
  return {
    co2sav, totalDistance, ratings, petrolSaved, type, greenMiles, costRecovered,
    batteryCharge, rangeCovered, rangeAvailable, ignition, locked, promotion, notification
  }
}

export async function verifyFrame(user: object, frameId: string) {
  const { uid, phone } = user as any
  const [validateFrame, myBikeData] = await Promise.all([ConnectmApi.validatePhone(phone), ConnectmApi.getMyBike(frameId as string)])
  const { fid: associatedFrameId } = validateFrame
  if (associatedFrameId != frameId) { throw new BikeError("frameId is not registered with phone"); }
  const { fid, mtrper: motorPer, batchrgper: batteryChargePer, batid: batteryId,
    bathltper: batteryHealthPer, vehid: vehicleId, model, type,
    servDate: serviceDate } = myBikeData//cross verify with mobile number
  if (!fid) throw new BikeError("frameId is not registered");
  //update frameId in new bike and user profile found from ValidatePhone API
  const result = await Promise.all([Bike.createNew({ frameId, model, uid }), User.updateByUid(uid, { frameId })])
  return {
    uid, frameId, model, type, serviceDate, batteryChargePer, batteries: [{ id: batteryId }]
  };
}

export async function getRideHistory(frameId: string, startTime: string, endTime: string, pageNo: number, pageSize: number) {
  const result = await Promise.all([ConnectmApi.getRideHistory(frameId, startTime as string,
    endTime as string, pageNo as number, pageSize as number),
  ConnectmApi.getRideHistoryStat(frameId, startTime as string,
    endTime as string, pageNo as number, pageSize as number)])
  const history = result[0]
  const graphData = result[1]
  if (!history[0].fid || !graphData[0].fid) return { history: [], graphData: [] }
  return { history, graphData }
}

export async function paginate(pageNumber: number, pageSize: number, condition: any) {
  let paginate = {}
  if (pageNumber || pageSize) {
    paginate = pagination(pageNumber, pageSize);
  }
  const issues = await Bike.pagination(paginate, condition)
  return issues
}
