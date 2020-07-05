import Sequelize, { Model, DataTypes } from 'sequelize';
import db from "../db"
import User from '../user/model';


export interface TRide extends Model {
    id: number;
    userId: number;
    vehicleId: number;
    feedbackId: number;
    distance: string | null;
    duration: string;
    modelType: string; // to be kept or not
    averageSpeed: string;
    maxSpeed: string;
    greenMiles: string;
    petrolSaved: string;
    caloriesBurnt: string;
    ratings: number;
    feedbackComment: string;
    rideStartDate: Date;
    rideEndDate: Date;
}

let Ride = db.define<TRide>('rides',
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
        vehicleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: 'bikes',
                key: 'id',     // todo change it tp vehicleId
            }
        },
        feedbackId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: 'feedbacks',
                key: 'id',
            }
        },

        distance: {
            type: Sequelize.STRING},

        duration: {
            type: Sequelize.STRING},

        modelType: {
            type: Sequelize.STRING},

        averageSpeed: {
            type: Sequelize.STRING},

        maxSpeed: {
            type: Sequelize.STRING},

        greenMiles: {
            type: Sequelize.STRING},

        petrolSaved: {
            type: Sequelize.STRING},

        caloriesBurnt: {
            type: Sequelize.STRING},

        ratings: {
            type: Sequelize.STRING},

        feedbackComment: {
            type: Sequelize.STRING},

        rideStartDate: {
            type: Sequelize.DATE},

        rideEndDate: {
            type: Sequelize.DATE},
    },
    {
        freezeTableName: true
    }
);


export default Ride

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
    //   });