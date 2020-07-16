import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"


export interface TFeatures {
    id: number;
    name: string;
    active: boolean;
    price: string; // not sure if it should be there
    premium: boolean;
}

export interface TUserFeatures {
    id: number;
    uid: number;
    featureId: number;
    purchaseDate: Date; // need to make sure
}

type TFeaturesModel<T> = typeof Model & {
    new(values?: object, options?: BuildOptions): T;
};

let Features: TFeaturesModel<TFeatures & Model> = <TFeaturesModel<TFeatures & Model>>
    db.define('features', {
        id: {
            type: Sequelize.INTEGER, // UUID
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: Sequelize.STRING },
        active: { type: Sequelize.STRING },
        price: { type: Sequelize.STRING },
        premium: { type: Sequelize.BOOLEAN },
    },
        {
            freezeTableName: true
        }
    );
type TUserFeaturesModel<T> = typeof Model & {
    new(values?: object, options?: BuildOptions): T;
};

let UserFeatures: TUserFeaturesModel<TUserFeatures & Model> = <TUserFeaturesModel<TUserFeatures & Model>>
    db.define('userFeatures', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: false,
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


export { Features, UserFeatures }

