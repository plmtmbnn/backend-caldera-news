import { UserModel, AuthorModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class UserQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await UserModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    const options: any = ({ ...payload });    
    return await UserModel.findAndCountAll(options);
  }

  async findAndCountAllWithAuthor(payload: queryPayload) {
    const options: any = ({
      attributes: ['id', 'full_name', 'email', 'created_at'],
      ...payload,
      include: [
        {
          model: AuthorModel,
          required: false,
          where: {
            status: true
          }
        }
      ]
    });    
    return await UserModel.findAndCountAll(options);
  }

  async findAndCountAllWithAuthorOptional(payload: queryPayload) {
    const options: any = ({
      attributes: ['id', 'full_name', 'email', 'created_at'],
      ...payload,
      include: [
        {
          model: AuthorModel,
          required: false
        }
      ]
    });    
    return await UserModel.findAndCountAll(options);
  }

  async update(value: any, payload: any) {
    const options: any = ({ ...payload });
    return await UserModel.update(value, options);
  }

  async insert(value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await UserModel.create(value, options);
  }
}

export const userQuery = new UserQuery();
