import { NewsLikeModel } from '../model/index';
require('../model/associations/index');

class NewsLikeQuery {
  async find (where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }

    return await NewsLikeModel.findAndCountAll(options);
  }

  async findAndCountAll (where: any = {}, transaction?: any) {
    return await NewsLikeModel.findAndCountAll({ where, transaction });
  }

  async update (value: any, where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });
    if (attributes.length !== 0) { options.attributes = attributes; };
    return await NewsLikeModel.update(value, { where });
  }

  async insert (value: any, attributes: any = [], transaction?: any) {
    const options: any = ({ ...value, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }
    return await NewsLikeModel.create(options);
  }
}

export const newsLikeQuery = new NewsLikeQuery();
