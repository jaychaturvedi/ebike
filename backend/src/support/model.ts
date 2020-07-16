import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"
import User from '../user/model';


export interface TUserSupportFeatures {
    id: number;
    supportFeaturesId: number;
    uid: string;

}
export interface TSupportFeatures {
    id: number;
    title: string;
    active: boolean;
    premium: boolean;

}

type TUserSupportFeaturesModel<T> = typeof Model & {
    new(values?: object, options?: BuildOptions): T;
};

let UserSupportFeatures: TUserSupportFeaturesModel<TUserSupportFeatures & Model> =
    <TUserSupportFeaturesModel<TUserSupportFeatures & Model>>
    db.define('userSupportFeatures', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: false,
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


type TSupportFeaturesModel<T> = typeof Model & {
    new(values?: object, options?: BuildOptions): T;
};

let SupportFeatures: TSupportFeaturesModel<TSupportFeatures & Model> = <TSupportFeaturesModel<TSupportFeatures & Model>>
    db.define('supportFeatures', {
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


export { SupportFeatures, UserSupportFeatures }

