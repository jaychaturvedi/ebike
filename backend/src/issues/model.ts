import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"

export interface TIssue {
  id: number;
  comments: string;
  uid: string;
  frameId: string;
}
type TIssueModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Issues: TIssueModel<TIssue & Model> = <TIssueModel<TIssue & Model>>db.define('issues',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    uid: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    frameId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  {
    freezeTableName: true
  }
);


export default Issues

