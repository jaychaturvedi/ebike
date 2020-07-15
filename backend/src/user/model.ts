import Sequelize, { BuildOptions, DataTypes, Model } from 'sequelize';
import db from "../db"

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

    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    uid: {
      type: Sequelize.STRING,
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

export default User