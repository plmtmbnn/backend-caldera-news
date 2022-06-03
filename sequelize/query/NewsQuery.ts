import { NewsModel } from '../model/index';
require('../model/associations/index');

class NewsQuery {
  async find (where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }

    return await NewsModel.findAndCountAll(options);
  }

  async findAndCountAll (where: any = {}, transaction?: any) {
    const options: any = ({ where, transaction });

    return await NewsModel.findAndCountAll(options);
  }

  async update (value: any, where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });
    if (attributes.length !== 0) { options.attributes = attributes; };
    return await NewsModel.update(value, { where });
  }

  async insert (value: any, attributes: any = [], transaction?: any) {
    const options: any = ({ ...value, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }
    return await NewsModel.create(options);
  }
}

export const newsQuery = new NewsQuery();
