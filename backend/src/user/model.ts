import Sequelize, { Model, DataTypes } from 'sequelize';
import db from "../db"

export interface TUser extends Model {
  id: number;
  name: string;
  phone: string;
  email: string;
  defaultVehicleId : string;
  // family: string;
}

let User = db.define<TUser>('users',
  {
   
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    defaultVehicleId: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true
  }
);

export default User