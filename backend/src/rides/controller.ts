import ConnectmApi from "../externalApi/motovolt";
import Ride from "./service";
import { RideError } from "../error";
import { createFeedback } from "../feedback/controller";

export async function getSpeedometer(rideId: string) {
  const { frameId } = await Ride.findOneWhere({ rideId })//pass frameId directly here
  const { batchrgper: batteryChargePer, rngcrv: rangeCovered, rngavail: rangeAvailable,
    dist: distance, kmph: speed, avgspd: averageSpeed, timeelp: timeElapsed,
    maxspd: maxSpeed, mode, pa: pedalAssit, pm: powerMode, ec: ecoMode, ign: ignition, st } =
    await ConnectmApi.getCurrentRide(frameId as string)
  if (st) throw new RideError("No data available for the rideId or device")
  const body = {
    frameId, batteryChargePer, rangeCovered, rangeAvailable, distance, averageSpeed,
    speed, maxSpeed, timeElapsed, mode, pedalAssit, powerMode, ecoMode, ignition
  }
  return body
}

export async function createNewRide(uid: string, frameId: string, rideId: string, startTime: string) {
  // const startTime = "2020-09-25 00:00:00"// Date.now() as any
  await Ride.createNew({ uid, frameId, rideId, startTime })
  return { rideId, frameId, uid, startTime }
}

export async function endRide(rideId: string, endTime: string) {
  // const endTime = "2020-09-25 23:59:59" //Date.now() as any
  const { frameId, startTime } = await Ride.findOneWhere({ rideId })
  const ride = await Promise.all([
    ConnectmApi.getEndRideStat(frameId as string, startTime as string, endTime),
    ConnectmApi.getEndRideGps(frameId as string, startTime as string, endTime as string),
    Ride.updateWhere({ rideId }, { endTime })
  ])
  console.log(ride);
  
  if (ride[0]?.st === "false") throw new RideError("no end ride stats available for the frameId");
  // if (!ride[1]?.length || ride[1][0]?.st === "false") throw new RideError("no gps path available for the frameId");
  const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed,
    grmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved,
    ptrlt: litreSaved } = ride[0]
  const gpsPath =(!ride[1]?.length || ride[1][0]?.st === "false") ? []: ride[1]
  // const { endTime: time } = ride[2] as any
  return {
    frameId, rideId, distance, duration, averageSpeed,
    maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved, startTime, endTime, gpsPath
  }
}

export async function rideDetail(frameId: string, startTime: string, endTime: string, tripId: string) {
  const ride = await Promise.all([
    ConnectmApi.histEndRideStat(frameId, tripId),
    ConnectmApi.getEndRideGps(frameId as string, startTime as string, endTime as string)
  ])
  // Ride.findOneWhere({ frameId, startTime, endTime })])
  if (ride[0]?.st === "false") throw new RideError("No ride stats available for the frameId");
  // if (!ride[1]?.length || ride[1][0]?.st === "false") throw new RideError("No gps path available for the frameId");
  const { dist: distance, avgspd: averageSpeed, dur: duration, maxspd: maxSpeed,
    grmls: greenMiles, calbnt: caloriesBurnt, ptrsav: petrolSaved,
    ptrlt: litreSaved, rating } = ride[0]
  const gpsPath = (!ride[1]?.length || ride[1][0]?.st === "false") ? []:ride[1]
  // const { rating } = ride[2]
  return {
    frameId, distance, duration, averageSpeed,
    maxSpeed, greenMiles, caloriesBurnt, petrolSaved, litreSaved, startTime, endTime, tripId, rating, gpsPath,
  }
}


export async function updateFeedback(rideId: string, rating: number, options: string[], comment?: string) {
  const result = await Promise.all([createFeedback(rideId, options, comment), Ride.updateWhere({ rideId }, { rating })])
  const feedback = result[0]
  const updated = result[1]
  if (!updated) throw new RideError("Couldn't update rating")
  return { rideId, rating, feedback }
}