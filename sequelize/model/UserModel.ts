import { sequelize } from '../init';
import { DataTypes } from 'sequelize';

export const UserModel = sequelize.define('t_user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  avatar_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  google_response: {
    type: DataTypes.JSON,
    allowNull: true
  },
  register_via: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  underscored: true,
  tableName: 't_user',
  createdAt: true,
  updatedAt: false
});
