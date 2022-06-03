import { NewsCategoryModel } from '../model/index';
require('../model/associations/index');

class NewsCategoryQuery {
  async find (where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }

    return await NewsCategoryModel.findAndCountAll(options);
  }

  async findAndCountAll (where: any = {}, transaction?: any) {
    return await NewsCategoryModel.findAndCountAll({ where });
  }

  async update (value: any, where: any = {}, attributes: any = [], transaction?: any) {
    const options: any = ({ where, transaction });
    if (attributes.length !== 0) { options.attributes = attributes; };
    return await NewsCategoryModel.update(value, { where });
  }

  async insert (value: any, attributes: any = [], transaction?: any) {
    const options: any = ({ ...value, transaction });

    if (attributes.length !== 0) { options.attributes = attributes; }
    return await NewsCategoryModel.create(options);
  }
}

export const newsCategoryQuery = new NewsCategoryQuery();
