import Sequelize, { Model, DataTypes } from 'sequelize';
import db from "../db"


export interface TFeatures extends Model {
    id: number;
    name: string;
    active: boolean;
    price: string; // not sure if it should be there
    premium: boolean;
}

export interface TUserFeatures extends Model {
    id: number;
    userId: number;
    featureId: number;
    purchaseDate: Date; // need to make sure
}

let Features = db.define<TFeatures>('features',
    {
        id: {
            type: Sequelize.INTEGER, // UUID
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING,
        active: Sequelize.STRING,
        price: Sequelize.STRING,
        premium: Sequelize.BOOLEAN,
    },
    {
        freezeTableName: true
    }
);
let UserFeatures = db.define<TUserFeatures>('userFeatures',
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
          featureId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            references: {
              model: 'features',
              key: 'id',
            }
          },
        purchaseDate: Sequelize.DATE,
    },
    {
        freezeTableName: true
    }
);


export {Features, UserFeatures}

