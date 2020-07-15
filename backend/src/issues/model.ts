import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"

export interface TIssue {
  id: number;
  comments: string;
  uid: number;
  frameId: number;
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
      type: Sequelize.INTEGER,
      allowNull: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
      }
    },
    frameId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'bikes',
        key: 'id',
      }
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

