import Sequelize, { BuildOptions, Model } from 'sequelize';
import db from "../db"

export interface TDashboard {
  dashboardId?: string;
  dashboardName: string;
  dashboardImageUrl: string;
  authorizedGroup: string[];
}

type TDashboardModel<T> = typeof Model & {
  new(values?: object, options?: BuildOptions): T;
};

let Dashboard: TDashboardModel<TDashboard & Model> = <TDashboardModel<TDashboard & Model>>db.define('dashboard',
  {

    dashboardId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dashboardName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dashboardImageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    authorizedGroup: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    }
  },
  {
    freezeTableName: true
  }
);

export default Dashboard