import { UserError, BikeError, BadRequestError } from "../error"
import ConnectmApi from '../externalApi/motovolt'
import User, { TFilter } from "../user/service"
import Sequelize from 'sequelize';
import Bike from "./service";
import { pagination, filters } from "../helper";
const Op = Sequelize.Op

export async function verifyFrame(uid: string, frameId: string) {
  await User.findByUid(uid)
  const bikedetails = await ConnectmApi.getBikeDetails(frameId as string);
  if (bikedetails.st === "false") throw new BadRequestError("Cant get details")
  const bike = await Bike.createNew(bikedetails)
  const isUpdated = await User.updateByUid(uid, { frameId: frameId as string })
  if (!isUpdated) throw new UserError("Unable to update ")
  return bikedetails;
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

