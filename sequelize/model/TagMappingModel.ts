import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const TagMappingModel = sequelize.define('t_tag_mapping', {
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
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  underscored: true,
  tableName: 't_tag_mapping',
  createdAt: false,
  updatedAt: false
});
