import { NewsLikeModel } from '../model/index';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class NewsLikeQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await NewsLikeModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    return await NewsLikeModel.findAndCountAll({ ...payload });
  }

  async update(value: any, payload: any) {
    return await NewsLikeModel.update(value, { ...payload });
  }

  async insert(value: any, payload: queryPayload) {
    return await NewsLikeModel.create(value, { ...payload });
  }
}

export const newsLikeQuery = new NewsLikeQuery();
