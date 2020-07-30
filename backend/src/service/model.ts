import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"
import User from '../user/model';

export interface TIssue {
  serviceId?: number;
  uid?: string;
  status: number;
  comments?: string;
  openTime?: Date;
  closeTime?: Date;

}
type TIssueModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Issues: TIssueModel<TIssue & Model> = <TIssueModel<TIssue & Model>>db.define('issues',
  {
    serviceId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    uid: {
      type: Sequelize.STRING,
      allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'uid',
      }
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: true
    },
    openTime: {
      type: Sequelize.DATE,
      allowNull: true
    },
    closeTime: {
      type: Sequelize.DATE,
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);
// Issues.belongsTo(Ride, { foreignKey: 'rideId', targetKey: 'rideId', constraints: false, onDelete: 'CASCADE' })
export default Issues

