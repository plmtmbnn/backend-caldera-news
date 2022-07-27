import { sequelize } from '../init';
import { DataTypes } from 'sequelize';

export const NewsCategoryModel = sequelize.define('t_news_category', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_top_feature: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  underscored: true,
  tableName: 't_news_category',
  createdAt: true,
  updatedAt: true
});
