import Sequelize, { Model, DataTypes } from 'sequelize';
import db from "../db"
import User from '../user/model';


export interface TUserFeatures extends Model {
    id: number;
    supportFeaturesId: number;
    userId: number;

}
export interface TFeatures extends Model {
    id: number;
    title: string;
    active: boolean;
    premium: boolean;

}

let UserFeatures = db.define<TUserFeatures>('userSupportFeatures', {
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
    supportFeaturesId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
            model: 'supportFeatures',
            key: 'id',
        }
    }

})

let Features = db.define<TFeatures>('supportFeatures',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        premium: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        }

    },
    {
        freezeTableName: true
    }
);


export {UserFeatures, Features}

