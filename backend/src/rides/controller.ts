import ConnectmApi, { TBikeDetails } from "../externalApi/motovolt";
import Ride from "./service";
import { TRide } from "./model";

export async function getNewRide(frameId: string) {

  const { batchrg: batteryCharge, rngcvr: rangeCovered, rngavail: rangeAvailable,
    dist: distance, kmph: speed, avgspd: averageSpeed, timeelp: timeElapsed,
    maxspd: maxSpeed, pa: pedalAssit, pm: powerMode, ign: ignitionstatus } =
    await ConnectmApi.getCurrentRideDetails(frameId)

  return {
    batteryCharge, rangeCovered, rangeAvailable, distance, averageSpeed,
    speed, maxSpeed, timeElapsed, pedalAssit, powerMode, ignitionstatus
  }
}

export async function getEndRide(frameId: string, startTime: string, endTime: string) {
  const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed,
    grnmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved,
    ptrlt: litreSaved } = await ConnectmApi.getEndRideDetails(frameId, startTime, endTime)
  const body = {
    frameId, distance, duration, averageSpeed,
    maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved
  }
  //need to insert uid as userId
  const ride = await Ride.createNew({ ...body, startTime, endTime })
  return body
}

export async function rateYourRide(frameId: string, startTime: string,
  endTime: string, rating: number) {
  const condition = { where: { frameId, startTime, endTime } }
  const updated = Ride.updateWhere(condition, { rating })
  return updated
}