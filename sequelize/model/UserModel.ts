import { sequelize } from '../init';
import { DataTypes, literal } from 'sequelize';

export const UserModel = sequelize.define('t_user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  facebook_id: {
    type: DataTypes.STRING,
    allowNull: true
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
  login_response: {
    type: DataTypes.JSON,
    allowNull: true
  },
  register_via: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: literal('NOW()')
  }
}, {
  underscored: true,
  tableName: 't_user',
  createdAt: true,
  updatedAt: true
});
