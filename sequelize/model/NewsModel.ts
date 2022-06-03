import { sequelize } from '../init';
import { DataTypes } from 'sequelize';

export const NewsModel = sequelize.define('t_news', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  news_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  posted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  underscored: false,
  tableName: 't_news',
  createdAt: true,
  updatedAt: true
});
