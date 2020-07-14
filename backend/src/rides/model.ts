import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"

export interface TRide {
    id?: number;
    userId?: string;
    frameId?: string;
    feedbackId?: number;
    distance?: number;
    duration?: string;
    averageSpeed?: number;
    maxSpeed?: number;
    greenMiles?: number;
    petrolSaved?: number;
    litreSaved?: number
    caloriesBurnt?: number;
    rating?: number;
    feedbackComment?: string;
    startTime?: string;
    endTime?: string;
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
            type: Sequelize.STRING,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: 'users',
                key: 'uid',
            }
        },
        frameId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        feedbackId: {
            type: Sequelize.INTEGER,
            allowNull: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
                model: 'feedbacks',
                key: 'id',
            }
        },
        distance: {
            type: Sequelize.INTEGER
        },
        duration: {
            type: Sequelize.STRING
        },
        averageSpeed: {
            type: Sequelize.INTEGER
        },
        maxSpeed: {
            type: Sequelize.INTEGER
        },
        greenMiles: {
            type: Sequelize.INTEGER
        },
        petrolSaved: {
            type: Sequelize.INTEGER
        },
        litreSaved: {
            type: Sequelize.INTEGER
        },
        caloriesBurnt: {
            type: Sequelize.INTEGER
        },
        rating: {
            type: Sequelize.INTEGER
        },
        feedbackComment: {
            type: Sequelize.STRING
        },
        startTime: {
            type: Sequelize.STRING
        },
        endTime: {
            type: Sequelize.STRING
        },
    },
    {
        freezeTableName: true
    }
);


export default Ride
