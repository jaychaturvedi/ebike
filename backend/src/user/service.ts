import UserModel, { TUser } from "./model"
import { UserError, BikeError } from "../error"

export type TFilter = {
  name?: string;
  id?: number;
  uid?: string;
  phone?: string;
  email?: string;
  pageSize?: number;
  pageNumber?: number;
}

export default class User {

  static async findByPhone(phone: string) {
    const user = await UserModel.findOne({ where: { phone } })
    if (!user) throw new UserError(`${phone} not found`)
    return user
  }

  static async findByUid(uid: string) {
    const user = await UserModel.findOne({ where: { uid } })
    if (!user) throw new UserError(`${uid} not found `)
    return user
  }

  static async findAll() {
    const bikes = await UserModel.findAll()
    return bikes
  }

  static async createNew(user: TUser) {
    const phone = user.phone;
    const existingUser = await UserModel.findOne({ where: { phone } })
    if (existingUser) { throw new UserError("User already exists") }
    const newuser = await UserModel.create(user)
    if (!newuser) throw new UserError("Unable to create new ")
    return newuser;
  }

  static async updateByPhone(phone: string, user: TUser) {
    await User.findByPhone(phone)
    const [isUpdated, [result]] = await UserModel.update(user, {
      where: { phone },
      returning: true
    })
    if (!isUpdated) throw new UserError("Unable to update with id ")
    return result;
  }

  static async updateByUid(uid: string, user: TUser) {
    await User.findByUid(uid)
    const [isUpdated, [result]] = await UserModel.update(user, {
      where: { uid },
      returning: true
    })
    if (!isUpdated) throw new UserError("Unable to update with id ")
    return result;
  }

  static async deleteById(uid: string) {
    const deleted = await UserModel.destroy({
      where: { uid }
    });
    if (!deleted) throw new UserError("Unable to delete user with id " + uid);
    return deleted
  }

  static async deleteByPhone(phone: string) {
    const deleted = await UserModel.destroy({
      where: { phone }
    });
    if (!deleted) throw new UserError("Unable to delete user with " + phone);
    return deleted
  }

  static async findAndCountAll(paginate: any, where: any) {
    const users = await UserModel.findAndCountAll({ ...paginate, where })
    if (!users) throw new BikeError("Unable to find and count");
    return users
  }

}
