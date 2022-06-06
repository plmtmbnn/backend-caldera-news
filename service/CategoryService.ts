import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';
import { HttpHelper } from '../helper/HttpHelper';

import {
  newsCategoryQuery
} from '../sequelize/query';
import { sequelize } from '../sequelize/init';
import { Op, col, fn, where, literal } from 'sequelize';
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

    if (result.rowCount === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    return { data: result.rows}
  }
}
