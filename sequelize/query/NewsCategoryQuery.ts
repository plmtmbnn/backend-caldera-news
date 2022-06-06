import { NewsCategoryModel } from '../model/index';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class NewsCategoryQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await NewsCategoryModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    return await NewsCategoryModel.findAndCountAll({ ...payload });
  }

  async update(value: any, payload: any) {
    return await NewsCategoryModel.update(value, { ...payload });
  }

  async insert(value: any, payload: queryPayload) {
    return await NewsCategoryModel.create(value, { ...payload });
  }
}

export const newsCategoryQuery = new NewsCategoryQuery();
