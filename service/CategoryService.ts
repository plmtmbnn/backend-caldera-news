import {Request, Response} from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { HttpHelper } from '../helper/HttpHelper';

import {
  userQuery
} from '../sequelize/query';
import { sequelize } from '../sequelize/init';
import { Op, col, fn, where, literal }  from 'sequelize';


export class CategoryService {
  static async getCategoryList (req: Request, res: Response): Promise<any> {

  }
}
