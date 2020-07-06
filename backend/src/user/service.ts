import UserModel, {TUser} from "./model"
import {filters, pagination } from '../helper'
import Sequelize from 'sequelize';


export type TFilter = {
    name:string | undefined;
    id:number | undefined;
    phone : string | undefined;
    email : string | undefined;
    pageSize : number | undefined;
    pageNumber : number | undefined;
}

export default class User {

    static async findById(id: number) {
        const user = await UserModel.findByPk( id )
        if (!user) throw new Error('Unable to find user by id '+id);
        return user
    }


    static async createNew(user: TUser) {
        const newuser = await UserModel.create(user)
        if (!user) throw new Error("Unable to create new user")
        return newuser;
    }

    static async updateById(id :number,user: TUser){
        await User.findById(id)
        const [isUpdated, [result]] = await UserModel.update(user,{
            where: { id },             
            returning : true
        })
        if (!isUpdated) throw new Error("Unable to update bike with id ")
        return result;
        
    }

    static async deleteById(id: number) {
        const deleted = await UserModel.destroy({
            where: { id }
        });
        if (!deleted) throw new Error("Unable to delete user with id "+id);
        return deleted
    }

    static async findAll(filter:TFilter) {
        const {pageNumber, pageSize} = filter
        delete filter.pageNumber; delete filter.pageSize
        let paginate = {}
        if(pageNumber || pageSize){
                paginate = pagination(pageNumber!,pageSize!);
        }
        const where = filters(filter)
        const users= await UserModel.findAndCountAll({...paginate, where})
        if (!users) throw new Error("Unable find any user")        
        return users
    }

}
