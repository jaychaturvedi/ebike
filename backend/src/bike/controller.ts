import { UserError, BikeError, BadRequestError } from "../error"
import ConnectmApi from '../externalApi/motovolt'
import User, { TFilter } from "../user/service"
import Sequelize from 'sequelize';
import Bike from "./service";
import { pagination, filters } from "../helper";
const Op = Sequelize.Op

export async function getMyBike(frameId: string) {
  const { fid, mtrper: motorPer, batchrgper: batteryChargePer, batid: batteryId,
    bathltper: batteryHealthPer, vehid: vehicleId, model, type,
    servDate: serviceDate } = await ConnectmApi.getMyBike(frameId as string);
  if (!fid) throw new BikeError("frameId is not registered");
  const { bikeName } = await Bike.findOne({ frameId })
  return { bikeName, motorPer, batteryChargePer, batteryHealthPer, batteries: [{ id: batteryId }], vehicleId, serviceDate }
}

export async function homeScreen(frameId: string,) {
  const [bikeStat, myBike, bikeLiveData] = await Promise.all([
    ConnectmApi.getBikeStat(frameId as string),
    ConnectmApi.getMyBike(frameId as string),
    ConnectmApi.getBikeLiveData(frameId as string)])
  const { type } = myBike
  const { co2sav, totdist: totalDistance, rats: ratings, petlsav: petrolSaved,
    grnmls: greenMiles, costrcv: costRecovered } = bikeStat
  const { batchrgper: batteryCharge, rngcvr: rangeCovered,
    rngavail: rangeAvailable, ign: ignition, lc: locked, prom: promotion, noty: notification } = bikeLiveData
  if (bikeLiveData.st || bikeStat.st || myBike.st) throw new BikeError("Please check valid frameId")
  return {
    co2sav, totalDistance, ratings, petrolSaved, type, greenMiles, costRecovered,
    batteryCharge, rangeCovered, rangeAvailable, ignition, locked, promotion, notification
  }
}

export async function verifyFrame(uid: string, frameId: string) {
  const { fid, mtrper: motorPer, batchrgper: batteryChargePer, batid: batteryId,
    bathltper: batteryHealthPer, vehid: vehicleId, model, type,
    servDate: serviceDate } = await ConnectmApi.getMyBike(frameId as string)//cross verify with mobile number
  if (!fid) throw new BikeError("frameId is not registered");
  const result = await Promise.all([Bike.createNew({ frameId, model, uid }), User.updateByUid(uid, { frameId })])
  return {
    uid, frameId, model, type, serviceDate, batteryChargePer, batteries: [{ id: batteryId }]
  };
}

export async function getRideHistory(frameId: string, startTime: string, endTime: string, pageNo: number, pageSize: number) {
  const history = await ConnectmApi.getRideHistory(frameId, startTime as string,
    endTime as string, pageNo as number, pageSize as number)
  const graphData = await ConnectmApi.getRideHistoryStat(frameId, startTime as string,
    endTime as string, pageNo as number, pageSize as number)
  if (!history[0].fid || !graphData[0].fid) throw new BikeError("please check time and frameId");
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
