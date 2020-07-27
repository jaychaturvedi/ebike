import ConnectmApi from "../externalApi/motovolt";
import Ride from "./service";
import { RideError } from "../error";
import { createIssues } from "../issues/controller";
import { createFeedback } from "../feedback/controller";

export async function getSpeedometer(rideId: string) {
  const { frameId } = await Ride.findOne({ rideId })
  const { batchrgper: batteryChargePer, rngcrv: rangeCovered, rngavail: rangeAvailable,
    dist: distance, kmph: speed, avgspd: averageSpeed, timeelp: timeElapsed,
    maxspd: maxSpeed, pa: pedalAssit, pm: powerMode, ign: ignitionstatus } =
    await ConnectmApi.getCurrentRideDetails(frameId as string)
  const body = {
    batteryChargePer, rangeCovered, rangeAvailable, distance, averageSpeed,
    speed, maxSpeed, timeElapsed, pedalAssit, powerMode, ignitionstatus
  }
  return body
}

export async function getNewRide(uid: string, frameId: string, rideId: string) {
  const ride = await Ride.createNew({ uid, frameId, rideId, startTime: Date.now() as any })
  return ride
}



export async function getEndRide(rideId: string) {
  const { frameId, startTime } = await Ride.findOne({ rideId })
  const endTime = Date.now() as any as string
  const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed,
    grnmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved,
    ptrlt: litreSaved } = await ConnectmApi.getEndRideDetails(frameId as string, startTime as string, endTime)
  const body = {
    rideId, distance, duration, averageSpeed,
    maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved, startTime, endTime
  }
  const updated = Ride.updateWhere({ rideId }, { endTime })
  return updated
}

export async function updateFeedback(rideId: string, rating: number, options: string[], comment?: string) {
  const condition = { where: { rideId } }
  const updated = Ride.updateWhere(condition, { rating })
  const feedback = await createFeedback(rideId, options, comment)
  if (!updated) throw new RideError("Couldn't update rating")
  return { rideId, rating, feedback }
}