import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const NewsModel = sequelize.define('t_news', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v1()')
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
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'DRAFT'
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  posted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_recommendation: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  is_trending: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  total_visit: {
    type: DataTypes.BIGINT,
    allowNull: false,
    defaultValue: 0
  },
}, {
  underscored: true,
  tableName: 't_news',
  createdAt: true,
  updatedAt: true
});
