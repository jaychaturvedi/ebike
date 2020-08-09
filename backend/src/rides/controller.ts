import ConnectmApi from "../externalApi/motovolt";
import Ride from "./service";
import { RideError } from "../error";
import { createFeedback } from "../feedback/controller";

export async function getSpeedometer(rideId: string) {
  const { frameId } = await Ride.findOneWhere({ rideId })
  const { batchrgper: batteryChargePer, rngcrv: rangeCovered, rngavail: rangeAvailable,
    dist: distance, kmph: speed, avgspd: averageSpeed, timeelp: timeElapsed,
    maxspd: maxSpeed, pa: pedalAssit, pm: powerMode } =
    await ConnectmApi.getCurrentRide(frameId as string)
  const body = {
    frameId, batteryChargePer, rangeCovered, rangeAvailable, distance, averageSpeed,
    speed, maxSpeed, timeElapsed, pedalAssit, powerMode,
  }
  return body
}
export async function createNewRide(uid: string, frameId: string, rideId: string) {
  const startTime = "2020-06-30 11:08:38"//Date.now() as any
  const { startTime: time } = await Ride.createNew({ uid, frameId, rideId, startTime })
  return { rideId, frameId, uid, startTime: time }
}
//need to be removed in prod
// "startTime":"2020-06-30 11:08:38",
//     "endTime":"2020-06-30 12:45:30"    

export async function endRide(rideId: string) {
  const endTime = "2020-06-30 12:45:30"//Date.now() as any
  const { frameId, startTime } = await Ride.findOneWhere({ rideId })
  console.log(startTime)
  const ride = await Promise.all([ConnectmApi.getEndRideStat(frameId as string, startTime as string, endTime),
  ConnectmApi.getEndRideGps(frameId as string, startTime as string, endTime as string), Ride.updateWhere({ rideId }, { endTime })])
  if (!ride[0].fid) throw new RideError("couldn't end ride");
  const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed,
    grnmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved,
    ptrlt: litreSaved } = ride[0]
  const gpsPath = ride[1]
  const { endTime: time } = ride[2] as any
  return {
    frameId, rideId, distance, duration, averageSpeed,
    maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved, startTime, endTime: time, gpsPath
  }
}

export async function rideDetail(frameId: string, startTime: string, endTime: string) {
  const ride = await Promise.all([ConnectmApi.getEndRideStat(frameId as string, startTime as string, endTime),
  ConnectmApi.getEndRideGps(frameId as string, startTime as string, endTime as string),
  Ride.findOneWhere({ frameId, startTime, endTime })])
  if (!ride[0].fid) throw new RideError("couldn't end ride");
  const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed,
    grnmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved,
    ptrlt: litreSaved } = ride[0]
  const gpsPath = ride[1]
  const { rating } = ride[2]
  return {
    frameId, distance, duration, averageSpeed,
    maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved, startTime, endTime, gpsPath, rating
  }
}


export async function updateFeedback(rideId: string, rating: number, options: string[], comment?: string) {
  const updated = Ride.updateWhere({ rideId }, { rating })
  const feedback = await createFeedback(rideId, options, comment)
  if (!updated) throw new RideError("Couldn't update rating")
  return { rideId, rating, feedback }
}