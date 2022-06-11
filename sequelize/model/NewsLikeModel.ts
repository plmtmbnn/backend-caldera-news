import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const NewsLikeModel = sequelize.define('t_news_like', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v1()')
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
  underscored: true,
  tableName: 't_news_like',
  createdAt: true,
  updatedAt: false
});
