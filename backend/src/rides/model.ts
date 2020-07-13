import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"

export interface TRide extends Model {
    id: number;
    userId: number;
    frameId: number;
    feedbackId: number;
    distance: string;
    duration: string;
    modelType: string;
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

type TRideModel<T> = typeof Model & {
    new(values?: object, options?: BuildOptions): T;
};

let Ride: TRideModel<TRide & Model> = <TRideModel<TRide & Model>>db.define('rides',
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
            type: Sequelize.STRING
        },

        duration: {
            type: Sequelize.STRING
        },

        modelType: {
            type: Sequelize.STRING
        },

        averageSpeed: {
            type: Sequelize.STRING
        },

        maxSpeed: {
            type: Sequelize.STRING
        },

        greenMiles: {
            type: Sequelize.STRING
        },

        petrolSaved: {
            type: Sequelize.STRING
        },

        caloriesBurnt: {
            type: Sequelize.STRING
        },

        ratings: {
            type: Sequelize.STRING
        },

        feedbackComment: {
            type: Sequelize.STRING
        },

        rideStartDate: {
            type: Sequelize.DATE
        },

        rideEndDate: {
            type: Sequelize.DATE
        },
    },
    {
        freezeTableName: true
    }
);


export default Ride
