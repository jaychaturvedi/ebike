import Sequelize, { Model, DataTypes } from 'sequelize';
import db from "../db"
import User from '../user/model';


export interface TFeedback extends Model {
    id : number ;
    options : string;
    
  }

let Feedback = db.define<TFeedback>('feedbacks',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
          options: {
            type: Sequelize.STRING,
            allowNull: false,
            
          }
        
    },
    {
        freezeTableName: true
    }
);
 

export default Feedback

