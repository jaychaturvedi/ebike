import ConnectmApi, { TBikeDetails } from "../externalApi/motovolt";
import Ride from "./service";
import { RideError } from "../error";

export async function getNewRide(frameId: string) {

  const { batchrg: batteryCharge, rngcrv: rangeCovered, rngavail: rangeAvailable,
    dist: distance, kmph: speed, avgspd: averageSpeed, timeelp: timeElapsed,
    maxspd: maxSpeed, pa: pedalAssit, pm: powerMode, ign: ignitionstatus } =
    await ConnectmApi.getCurrentRideDetails(frameId)

  return {
    batteryCharge, rangeCovered, rangeAvailable, distance, averageSpeed,
    speed, maxSpeed, timeElapsed, pedalAssit, powerMode, ignitionstatus
  }
}

export async function getEndRide(frameId: string, startTime: string, endTime: string, rideId?: string) {
  const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed,
    grnmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved,
    ptrlt: litreSaved } = await ConnectmApi.getEndRideDetails(frameId, startTime, endTime)
  const body = {
    distance, duration, averageSpeed,
    maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved, startTime, endTime
  }
  //need to insert uid as userId
  const ride = await Ride.createNew({ ...body, frameId, rideId })
  return body
}

export async function rateYourRide(rideId: string, rating: number) {
  const condition = { where: { rideId } }
  const updated = Ride.updateWhere(condition, { rating })
  if (!updated) throw new RideError("Couldn't update rating")
  return { rating }
}