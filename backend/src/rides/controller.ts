import ConnectmApi from "../externalApi/motovolt";
import Ride from "./service";
import { RideError } from "../error";
import { createIssues } from "../issues/controller";
import { createFeedback } from "../feedback/controller";

export async function getSpeedometer(rideId: string) {
  const { frameId } = await Ride.findOneWhere({ rideId })
  const { batchrgper: batteryChargePer, rngcrv: rangeCovered, rngavail: rangeAvailable,
    dist: distance, kmph: speed, avgspd: averageSpeed, timeelp: timeElapsed,
    maxspd: maxSpeed, pa: pedalAssit, pm: powerMode } =
    await ConnectmApi.getCurrentRide(frameId as string)
  const body = {
    batteryChargePer, rangeCovered, rangeAvailable, distance, averageSpeed,
    speed, maxSpeed, timeElapsed, pedalAssit, powerMode,
  }
  return body
}

export async function getNewRide(uid: string, frameId: string, rideId: string) {
  const ride = await Ride.createNew({ uid, frameId, rideId, startTime: Date.now() as any })
  return ride
}

export async function getEndRide(rideId: string) {
  const { frameId, startTime } = await Ride.findOneWhere({ rideId })
  const endTime = Date.now() as any as string
  const updated = await Ride.updateWhere({ rideId }, { endTime })
  const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed,
    grnmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved,
    ptrlt: litreSaved } = await ConnectmApi.getEndRideStat(frameId as string, startTime as string, endTime)
  const gpsPath = await ConnectmApi.getEndRideGps(frameId as string, startTime as string, endTime as string)//get gpspath
  return {
    rideId, distance, duration, averageSpeed,
    maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved, startTime, endTime, gpsPath
  }
}

export async function updateFeedback(rideId: string, rating: number, options: string[], comment?: string) {
  const updated = Ride.updateWhere({ rideId }, { rating })
  const feedback = await createFeedback(rideId, options, comment)
  if (!updated) throw new RideError("Couldn't update rating")
  return { rideId, rating, feedback }
}