import User, { TFilter } from "./service";
import { pagination, filters } from "../helper";
import ConnectmApi from "../externalApi/motovolt";

export async function profile(uid: string) {
  const user = await User.findByUid(uid)
  //since data is redundant
  // const { batid: batteryId, vehid: vehicleId, servDate: serviceDate, purchaseDate, warrantyValidTill } = await ConnectmApi.getMyBike(frameId as string);
  return user
}

export async function paginateUser(filter: TFilter) {
  const { pageNumber, pageSize } = filter
  delete filter.pageNumber; delete filter.pageSize
  let paginate = {}
  if (pageNumber || pageSize) {
    paginate = pagination(pageNumber!, pageSize!);
  }
  const where = filters(filter)
  const users = await User.findAndCountAll(paginate, where)
  if (!users) return 0
  return users
}
