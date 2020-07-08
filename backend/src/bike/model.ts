import Sequelize, { Model } from 'sequelize';
import db from "../db"

export interface TBike extends Model {

  id: number;
  name: string;
  userId: number; // Todo change types to UUID
  frameId: string; // Todo change types to UUID
  warrantyId: string;
  batteryId: string[]; //not sure about array
  modelType: string;
  //frequently updated fields below
  batteryCharge: string;
  rangeCovered: string;
  rangeAvailable: string;
  overallBatteryHealth: string;
  motorHealth: string;
  ignitionStatus: boolean;
  isLocked: boolean;
  purchaseDate: Date;
  serviceDate: Date;
}

let Bike = db.define<TBike>('bikes',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
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
      type: Sequelize.STRING,
      allowNull: false,
    },
    warrantyId: {
      type: Sequelize.STRING
    },

    batteryId: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    //to be changed later
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

// id: {
//     type: Sequelize.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
// },

//Task.associate = function (models) {
    // models.Task.belongsTo(models.User, {
    //     onDelete: "CASCADE",
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });STRING