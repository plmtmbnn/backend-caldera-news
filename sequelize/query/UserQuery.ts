import { UserModel } from '../model/index';
require('../model/associations/index');

class UserQuery {
  async find(where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }

    return await UserModel.findAndCountAll(options);
  }

  async findAndCountAll(where: any = {}, transaction?: any) {
    const options: any = ({ where, transaction });

    return await UserModel.findAndCountAll(options);
  }

  async update(value: any, where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });
    if (attributes.length !== 0) { options.attributes = attributes; };
    return await UserModel.update(value, { where });
  }

  async insert(value: any, attributes: any = [], transaction?: any) {
    const options: any = ({ ...value, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }
    return await UserModel.create(options);
  }
}

export const userQuery = new UserQuery();
