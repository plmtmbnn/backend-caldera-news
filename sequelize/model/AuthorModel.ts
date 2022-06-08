import { sequelize } from '../init';
import { DataTypes } from 'sequelize';

export const AuthorModel = sequelize.define('t_author', {
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
  author_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  underscored: false,
  tableName: 't_author',
  createdAt: false,
  updatedAt: false
});
