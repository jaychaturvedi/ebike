import Sequelize, { BuildOptions, DataTypes, Model } from 'sequelize';
import db from "../db"
import FaqQnA from '../faqQnA/model';

export interface TFaq {
    id: number,
    name: string,
    icon: string,
    active: boolean
}



type TFaqModel<T> = typeof Model & {
    new(values?: object, options?: BuildOptions): T;
};

let Faq: TFaqModel<TFaq & Model> = <TFaqModel<TFaq & Model>>db.define('faqCategory',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        freezeTableName: true
    }
);

Faq.hasMany(FaqQnA, {
  foreignKey: 'faqId',
  sourceKey: 'id',
});

// Faq.sync({force:true}).then(()=>{console.log("success");
// }).catch((e)=>{
//   console.log(e);
// })

export default Faq