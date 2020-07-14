import Sequelize, { Model, BuildOptions } from 'sequelize';
import db from "../db"

export interface TBike {
  id?: number;
  bikeName?: string;
  userId?: string;
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
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bikeName: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      }
    },
    frameId: {
      type: Sequelize.STRING,
      allowNull: false,
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

export default Bike
