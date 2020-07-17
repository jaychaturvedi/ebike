import Sequelize, { Model, BuildOptions } from 'sequelize';
import db from "../db"
import User from '../user/model';
import Ride from '../rides/model';

export interface TBike {
  id?: number;
  bikeName?: string;
  uid?: string;
  frameId?: string;
  warrantyId?: string;
  batteryId?: string;
  modelType?: string;
  //frequently updated fields below
  batteryCharge?: string;
  rangeCovered?: string;
  rangeAvailable?: string;
  overallBatteryHealth?: string;
  motorHealth?: string;
  ignitionStatus?: boolean;
  isLocked?: boolean;
  purchaseDate?: Date;
  serviceDate?: Date;
}

type TBikeModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Bike: TBikeModel<TBike & Model> = <TBikeModel<TBike & Model>>db.define('bikes',
  {
    frameId: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    uid: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uid',
      }
    },
    bikeName: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    warrantyId: {
      type: Sequelize.STRING
    },
    batteryId: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    modelType: {
      type: Sequelize.STRING
    },
    batteryCharge: {
      type: Sequelize.STRING
    },
    rangeCovered: {
      type: Sequelize.STRING
    },
    rangeAvailable: {
      type: Sequelize.STRING
    },
    overallBatteryHealth: {
      type: Sequelize.STRING
    },
    ignitionStatus: {
      type: Sequelize.BOOLEAN
    },
    isLocked: {
      type: Sequelize.BOOLEAN
    },
    purchaseDate: {
      type: Sequelize.DATE
    },
    serviceDate: {
      type: Sequelize.DATE
    },
  },
  { freezeTableName: true }
);

Bike.hasMany(Ride, {
  foreignKey: 'frameId',
  sourceKey: 'frameId',
});

export default Bike
