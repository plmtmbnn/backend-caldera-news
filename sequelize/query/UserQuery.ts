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
    const options: any = ({ ...payload });    
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
