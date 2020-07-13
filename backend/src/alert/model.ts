import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"

export interface TSmartAlert {
  id: number;
  alertType: string;
  vehicleId: string;
  batteryId: string;
  customerId: string;
  alertName: string;
  alertTime: Date;
  model: string;
  subModel: string;
  openSince: Date;
  closedDate: Date;
  severity: string;
  mfgDate: string;
  location: string;
  zone: string;
  totalDistnce: string;
  utilization: string;
  ridePerMonth: string;
  averageRangePerRide: string;
  averageMilegae: string;
}

type TAlert<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let SmartAlert: TAlert<TSmartAlert & Model> = <TAlert<TSmartAlert & Model>>db.define('alerts',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    alertType: {
      type: Sequelize.STRING,
      allowNull: true
    },
    vehicleId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    customerId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    batteryId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    alertName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    alertTime: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    model: {
      type: Sequelize.STRING,
      allowNull: true
    },
    subModel: {
      type: Sequelize.STRING,
      allowNull: true
    },
    openSince: {
      type: Sequelize.DATE,
      allowNull: true
    },
    closedDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    severity: {
      type: Sequelize.STRING,
      allowNull: true
    },
    mfgDate: {
      type: Sequelize.STRING,
      allowNull: true
    },
    location: {
      type: Sequelize.STRING,
      allowNull: true
    },
    zone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    totalDistnce: {
      type: Sequelize.STRING,
      allowNull: true
    },
    utilization: {
      type: Sequelize.STRING,
      allowNull: true
    },
    ridePerMonth: {
      type: Sequelize.STRING,
      allowNull: true
    },
    averageRangePerRide: {
      type: Sequelize.STRING,
      allowNull: true
    },
    averageMilegae: {
      type: Sequelize.STRING,
      allowNull: true
    },
  },
  {
    freezeTableName: true
  }
);


export default SmartAlert

