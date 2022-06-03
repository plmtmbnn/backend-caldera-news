import { NewsCommentModel } from '../model/index';
require('../model/associations/index');

class NewsCommentQuery {
  async find (where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }

    return await NewsCommentModel.findAndCountAll(options);
  }

  async findAndCountAll (where: any = {}, transaction?: any) {
    return await NewsCommentModel.findAndCountAll({ where });
  }

  async update (value: any, where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });
    if (attributes.length !== 0) { options.attributes = attributes; };
    return await NewsCommentModel.update(value, { where });
  }

  async insert (value: any, attributes: any = [], transaction?: any) {
    const options: any = ({ ...value, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }
    return await NewsCommentModel.create(options);
  }
}

export const newsCommentQuery = new NewsCommentQuery();
