import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const ImageModel = sequelize.define('t_image', {
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
  image_url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: literal('now()')
  }
}, {
  underscored: true,
  tableName: 't_image',
  createdAt: false,
  updatedAt: false
});
