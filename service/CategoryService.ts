import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  newsCategoryQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';


export class CategoryService {
  static async getCategoryList(req: Request, res: Response): Promise<any> {
    let queryPayload: queryPayload = {
      where: {
        status : true
      },
      order: [['id', 'ASC']],
      attributes: ['id', 'category_name']
    };
    const result: any = await newsCategoryQuery.findAndCountAll(queryPayload);

    if (result.count === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    return { data: result.rows}
  }
}
