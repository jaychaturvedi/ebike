import { UserError, BikeError, BadRequestError } from "../error"
import ConnectmApi from '../externalApi/motovolt'
import User, { TFilter } from "../user/service"
import Sequelize from 'sequelize';
import Bike from "./service";
import { pagination, filters } from "../helper";
const Op = Sequelize.Op

export async function getBikeDetails(uid: string) {
  const { frameId } = await User.findByUid(uid)
  const bikedetails = await ConnectmApi.getBikeDetails(frameId as string);
  return bikedetails
}

export async function verifyFrame(uid: string, frameId: string) {
  const { model, st: status } = await ConnectmApi.getBikeDetails(frameId as string); //update all fields
  if (status) throw new BadRequestError("Cant get details")
  const user = await User.findByUid(uid)
  if (user.frameId) throw new UserError("frameId already verified")
  await User.updateByUid(uid, { frameId })
  const bike = await Bike.createNew({ frameId, model, uid })
  return bike;
}

export async function paginateBike(filter: TFilter) {
  const { pageNumber, pageSize } = filter
  delete filter.pageNumber; delete filter.pageSize
  let paginate = {}
  if (pageNumber || pageSize) {
    paginate = pagination(pageNumber!, pageSize!);
  }
  const where = filters(filter)
  const bikes = await Bike.findAndCountAll(paginate, where)
  if (!bikes) return 0
  return bikes
}

