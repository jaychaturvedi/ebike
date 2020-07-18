import Sequelize, { BuildOptions, DataTypes, Model } from 'sequelize';
import db from "../db"
import Bike from '../bike/model';

export interface TUser {
  id?: number;
  uid?: string;//userid
  fullName?: string;
  phone?: string;
  email?: string;
  frameId?: string;
}

type TUserModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let User: TUserModel<TUser & Model> = <TUserModel<TUser & Model>>db.define('users',
  {

    uid: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    frameId: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);

User.hasOne(Bike, {
  foreignKey: 'uid',
  sourceKey: 'uid'
});

export default User