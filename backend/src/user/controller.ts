import User, { TFilter } from "./service";
import { pagination, filters } from "../helper";
import ConnectmApi from "../externalApi/motovolt";

export async function profile(uid: string) {
  const { frameId, email, phone, fullName } = await User.findByUid(uid)
  const { batid: batteryId, vehid: vehicleId, servDate: serviceDate, purchaseDate, warrantyValidTill } = await ConnectmApi.getMyBike(frameId as string);
  return { uid, frameId, email, phone, fullName, batteries: [{ id: batteryId }], vehicleId, serviceDate, purchaseDate, warrantyValidTill }//need purchase date and warranty
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
