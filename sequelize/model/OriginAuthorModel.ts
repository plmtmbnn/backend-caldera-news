import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const OriginAuthorModel = sequelize.define('t_origin_author', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: literal('uuid_generate_v1()')
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  underscored: true,
  tableName: 't_origin_author',
  createdAt: false,
  updatedAt: false
});
