import { NewsViewLogModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class NewsViewLogQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await NewsViewLogModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    const options: any = ({ ...payload });    
    return await NewsViewLogModel.findAndCountAll(options);
  }

  async update(value: any, payload: any) {
    const options: any = ({ ...payload });
    return await NewsViewLogModel.update(value, options);
  }

  async insert(value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await NewsViewLogModel.create(value, options);
  }
}

export const newsViewLogQuery = new NewsViewLogQuery();
