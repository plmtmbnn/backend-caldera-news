import { sequelize } from '../init';
import { DataTypes } from 'sequelize';

export const NewsCommentModel = sequelize.define('t_news_comment', {
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
  comment: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  underscored: false,
  tableName: 't_news_comment',
  createdAt: true,
  updatedAt: false
});
