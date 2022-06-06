import { UserModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class UserQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await UserModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    return await UserModel.findAndCountAll({ ...payload });
  }

  async update(value: any, payload: any) {
    return await UserModel.update(value, { ...payload });
  }

  async insert(value: any, payload: queryPayload) {
    return await UserModel.create(value, { ...payload });
  }
}

export const userQuery = new UserQuery();
