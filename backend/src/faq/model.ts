import Sequelize, { BuildOptions, DataTypes, Model } from 'sequelize';
import db from "../db"
import Bike from '../bike/model';

export interface TFaq {
    id: number,
    name: string,
    icon: string,
    faq: {
        Question: string,
        Answer: string
    }[]
}



type TFaqModel<T> = typeof Model & {
    new(values?: object, options?: BuildOptions): T;
};

let Faq: TFaqModel<TFaq & Model> = <TFaqModel<TFaq & Model>>db.define('faq',
    {

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        faq: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            allowNull: false,
        }
    },
    {
        freezeTableName: true
    }
);


export default Faq