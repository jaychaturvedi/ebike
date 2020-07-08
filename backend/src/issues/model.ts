import Sequelize, { Model, DataTypes } from 'sequelize';
import db from "../db"


export interface TIssue extends Model {
  
  id: number;
  comments: string;
  userId: number;
  frameId: number;

}

let Issues = db.define<TIssue>('issues',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
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

