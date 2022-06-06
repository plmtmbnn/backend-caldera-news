import { NewsCommentModel } from '../model/index';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';


class NewsCommentQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await NewsCommentModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    return await NewsCommentModel.findAndCountAll({ ...payload });
  }

  async update(value: any, payload: any) {
    return await NewsCommentModel.update(value, { ...payload });
  }

  async insert(value: any, payload: queryPayload) {
    return await NewsCommentModel.create(value, { ...payload });
  }
}

export const newsCommentQuery = new NewsCommentQuery();
