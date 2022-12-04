import { NewsCategoryModel, AuthorModel,  NewsCommentModel, NewsLikeModel, NewsModel, UserModel, ImageModel, NewsViewLogModel, OriginAuthorModel, TagMappingModel, TagModel } from '../model/index';
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

  async syncAllTable() {
    // await UserModel.sync();
    // await NewsCategoryModel.sync();
    // await AuthorModel.sync();
    await OriginAuthorModel.sync({force: true}); 
    await TagModel.sync({force: true});
    await NewsModel.sync({force: true}); 
    await ImageModel.sync({force: true}); 
    await NewsCommentModel.sync({force: true}); 
    await NewsLikeModel.sync({force: true}); 
    await TagMappingModel.sync({force: true}); 
    await NewsViewLogModel.sync({force: true}); 
  }
}

export const newsCategoryQuery = new NewsCategoryQuery();
