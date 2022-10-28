import { TagMappingModel, TagModel } from '../model/index';
import { sequelize } from '../init';
// require('../model/associations/index');

import { queryPayload } from '../../helper/QueryPayload';

class TagMappingQuery {
  async find(payload: queryPayload) {
    const options: any = ({ ...payload });
    return await TagMappingModel.findAndCountAll(options);
  }

  async findAndCountAll(payload: queryPayload) {
    const options: any = ({ ...payload,
      include: [
        {
          model: TagModel,
          required: false,
        }]
    });    
    return await TagMappingModel.findAndCountAll(options);
  }

  async update(value: any, payload: any) {
    const options: any = ({ ...payload });
    return await TagMappingModel.update(value, options);
  }

  async insert(value: any, payload: queryPayload) {
    const options: any = ({ ...payload });
    return await TagMappingModel.create(value, options);
  }

  async destroy(payload: queryPayload) {
    return await TagMappingModel.destroy({ ...payload });
  }
}

export const tagMappingQuery = new TagMappingQuery();
