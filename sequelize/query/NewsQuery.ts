import { NewsModel } from '../model/index';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class NewsQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await NewsModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    return await NewsModel.findAndCountAll({ ...payload });
  }

  async update(value: any, payload: any) {
    return await NewsModel.update(value, { ...payload });
  }

  async insert(value: any, payload: queryPayload) {
    return await NewsModel.create(value, { ...payload });
  }
}

export const newsQuery = new NewsQuery();
