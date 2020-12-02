import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"

export interface TUpgrade {
  id: number;
  name: string;
  icon: string;
  price: number;

}
type TUpgradeModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Upgrades: TUpgradeModel<TUpgrade & Model> = <TUpgradeModel<TUpgrade & Model>>db.define('features',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    icon: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    }
  },
  {
    // sync: {force: true},
    freezeTableName: true,
  }
);
// Upgrades.sync({force:true}).then(()=>{console.log("success");
// }).catch((e)=>{
//   console.log(e);
// })
// Issues.belongsTo(Ride, { foreignKey: 'rideId', targetKey: 'rideId', constraints: false, onDelete: 'CASCADE' })
export default Upgrades

