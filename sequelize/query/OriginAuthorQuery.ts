import { OriginAuthorModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class OriginAuthorQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await OriginAuthorModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    const options: any = ({ ...payload });    
    return await OriginAuthorModel.findAndCountAll(options);
  }

  async update(value: any, payload: any) {
    const options: any = ({ ...payload });
    return await OriginAuthorModel.update(value, options);
  }

  async insert(value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await OriginAuthorModel.create(value, options);
  }
}

export const originAuthorQuery = new OriginAuthorQuery();
