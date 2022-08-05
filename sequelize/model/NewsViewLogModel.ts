import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const NewsViewLogModel = sequelize.define('t_news_view_log', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v1()')
  },
  news_id: {
    type: DataTypes.UUID,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: literal('now()')
  }
}, {
  underscored: true,
  tableName: 't_news_view_log',
  createdAt: false,
  updatedAt: false
});
