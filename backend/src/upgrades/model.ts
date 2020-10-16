import Sequelize, { Model, DataTypes, BuildOptions } from 'sequelize';
import db from "../db"
import User from '../user/model';

export interface TUpgrade {
    name: string;
    icon: string;
    price: number;

}
type TUpgradeModel<T> = typeof Model & {
    new(values?: object, options?: BuildOptions): T;
};

let Upgrades: TUpgradeModel<TUpgrade & Model> = <TUpgradeModel<TUpgrade & Model>>db.define('upgrades',
    {
        name: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        // uid: {
        //   type: Sequelize.STRING,
        //   allowNull: false,
        //   onDelete: 'CASCADE',
        //   references: {
        //     model: 'users',
        //     key: 'uid',
        //   }
        // },
    },
    {
        freezeTableName: true
    }
);
// Issues.belongsTo(Ride, { foreignKey: 'rideId', targetKey: 'rideId', constraints: false, onDelete: 'CASCADE' })
export default Upgrades

