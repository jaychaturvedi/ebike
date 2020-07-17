import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"
import User from '../user/model';

export interface TIssue {
  rideId: string;
  comments: string;
}
type TIssueModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Issues: TIssueModel<TIssue & Model> = <TIssueModel<TIssue & Model>>db.define('issues',
  {
    rideId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'rides',
        key: 'rideId',
      }
    },
    comments: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);
// Issues.belongsTo(Ride, { foreignKey: 'rideId', targetKey: 'rideId', constraints: false, onDelete: 'CASCADE' })
export default Issues

