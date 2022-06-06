import { AuthorModel } from '../model/index';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class AuthorQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await AuthorModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    return await AuthorModel.findAndCountAll({ ...payload });
  }

  async update(value: any, payload: any) {
    return await AuthorModel.update(value, { ...payload });
  }

  async insert(value: any, payload: queryPayload) {
    return await AuthorModel.create(value, { ...payload });
  }
}

export const authorQuery = new AuthorQuery();
