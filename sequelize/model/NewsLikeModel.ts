import { sequelize } from '../init';
import { DataTypes } from 'sequelize';

export const NewsLikeModel = sequelize.define('t_news_like', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  news_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
}, {
  underscored: false,
  tableName: 't_news_like',
  createdAt: false,
  updatedAt: false
});
