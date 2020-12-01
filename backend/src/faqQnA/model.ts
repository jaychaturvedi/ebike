import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"

export interface TFaqQnA {
  faqId: number;
  id: number;
  Question: string;
  Answer: string;
}

type TFaqQnAModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let FaqQnA: TFaqQnAModel<TFaqQnA & Model> = <TFaqQnAModel<TFaqQnA & Model>>db.define('faq',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
    },
    Question: {
      type: Sequelize.STRING(1000)
    },
    Answer: {
      type: Sequelize.STRING(1500)
    },
    // faqId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    //   onDelete: 'CASCADE',
    //   references: {
    //     model: 'faqCategory',
    //     key: 'id',
    //   }
    // },
  },
  {
    freezeTableName: true
  }
);

FaqQnA.sync({ force: true }).then(() => {
  console.log("success");
}).catch((e) => {
  console.log(e);
})

export default FaqQnA

