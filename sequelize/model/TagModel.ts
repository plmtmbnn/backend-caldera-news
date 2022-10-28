import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const TagModel = sequelize.define('t_tag', {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  underscored: true,
  tableName: 't_tag',
  createdAt: false,
  updatedAt: false
});
