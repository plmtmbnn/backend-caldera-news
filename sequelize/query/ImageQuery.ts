import { ImageModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class ImageQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await ImageModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    const options: any = ({ ...payload });    
    return await ImageModel.findAndCountAll(options);
  }

  async update(value: any, payload: any) {
    const options: any = ({ ...payload });
    return await ImageModel.update(value, options);
  }

  async insert(value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await ImageModel.create(value, options);
  }
}

export const imageQuery = new ImageQuery();
