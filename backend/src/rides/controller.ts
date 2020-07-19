import ConnectmApi, { TBikeDetails } from "../externalApi/motovolt";
import Ride from "./service";
import { RideError } from "../error";
import { createIssues } from "../issues/controller";

export async function getNewRide(uid: string, frameId: string, rideId: string) {
  const { batchrg: batteryCharge, rngcrv: rangeCovered, rngavail: rangeAvailable,
    dist: distance, kmph: speed, avgspd: averageSpeed, timeelp: timeElapsed,
    maxspd: maxSpeed, pa: pedalAssit, pm: powerMode, ign: ignitionstatus } =
    await ConnectmApi.getCurrentRideDetails(frameId)
  const body = {
    batteryCharge, rangeCovered, rangeAvailable, distance, averageSpeed,
    speed, maxSpeed, timeElapsed, pedalAssit, powerMode, ignitionstatus
  }
  const ride = await Ride.createNew({ uid, frameId, rideId })
  return body

}

export async function getEndRide(rideId: string, startTime: string, endTime: string) {
  const { frameId } = await Ride.findOne({ rideId })
  const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed,
    grnmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved,
    ptrlt: litreSaved } = await ConnectmApi.getEndRideDetails(frameId as string, startTime, endTime)
  const body = {
    rideId, distance, duration, averageSpeed,
    maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved, startTime, endTime
  }
  const updated = Ride.updateWhere({ rideId }, { startTime, endTime })
  return body
}

export async function updateFeedbacks(rideId: string, rating: number, issues?: string[]) {
  const condition = { where: { rideId } }
  const updated = Ride.updateWhere(condition, { rating })
  const issue = await createIssues(rideId, issues as string[])
  if (!updated) throw new RideError("Couldn't update rating")
  return { rideId, rating, issues }
}