import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"
import Feedback from '../feedback/model';

export interface TRide {
    rideId?: string;
    uid?: string;
    frameId?: string;
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
        rideId: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        frameId: {
            type: Sequelize.STRING,
            allowNull: true,
            onDelete: 'CASCADE',
            references: {
                model: 'bikes',
                key: 'frameId',
            }
        },
        startTime: {
            type: Sequelize.DATE
        },
        endTime: {
            type: Sequelize.DATE
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
        }
    },
    {
        freezeTableName: true
    }
);

Ride.hasOne(Feedback, {
    foreignKey: 'rideId',
    sourceKey: 'rideId',
});


export default Ride
