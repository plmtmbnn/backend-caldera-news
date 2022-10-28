import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  originAuthorQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';

import { sequelize } from "../sequelize/init";

export class OriginAuthorService {
  static async getOriginAuthor(req: Request, res: Response): Promise<any> {
    try {
      let queryPayload: queryPayload = {
        order: [['full_name', 'ASC']],
      };
      const result: any = await originAuthorQuery.findAndCountAll(queryPayload);
  
      if (result.count === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);
  
      return { data: result.rows}
    } catch (error) {
      console.log('error', error);
      
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
    
  }

  static async upsertOriginAuthor(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
        await originAuthorQuery.insert({
          full_name: req.body.full_name
        }, {
          transaction
        });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
        console.log('[OriginAuthorService][upsertOriginAuthor]', error);
    }
  }
}
