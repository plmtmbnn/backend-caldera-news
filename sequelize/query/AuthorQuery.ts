import { AuthorModel } from '../model/index';
require('../model/associations/index');

class AuthorQuery {
  async find (where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }

    return await AuthorModel.findAndCountAll(options);
  }

  async findAndCountAll (where: any = {}, transaction?: any) {
    return await AuthorModel.findAndCountAll({ where, transaction });
  }

  async update (value: any, where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });
    if (attributes.length !== 0) { options.attributes = attributes; };
    return await AuthorModel.update(value, { where });
  }

  async insert (value: any, attributes: any = [], transaction?: any) {
    const options: any = ({ ...value, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }
    return await AuthorModel.create(options);
  }
}

export const authorQuery = new AuthorQuery();
