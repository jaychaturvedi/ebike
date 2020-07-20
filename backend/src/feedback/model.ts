import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"

export interface TFeedback {
  rideId: string;
  comments?: string;
  options: string[];
}

type TFeedbackModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Feedback: TFeedbackModel<TFeedback & Model> = <TFeedbackModel<TFeedback & Model>>db.define('feedbacks',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    options: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    comments: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    freezeTableName: true
  }
);


export default Feedback

