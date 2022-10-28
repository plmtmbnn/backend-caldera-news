import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  tagQuery, tagMappingQuery
} from '../sequelize/query';

import { queryPayload } from 'helper/QueryPayload';

import { sequelize } from "../sequelize/init";

export class TagService {
  static async getTag(req: Request, res: Response): Promise<any> {
    try {
      let queryPayload: queryPayload = {
        order: [['name', 'ASC']],
      };
      const result: any = await tagQuery.findAndCountAll(queryPayload);
  
      if (result.count === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);
  
      return { data: result.rows}
    } catch (error) {
      console.log('error', error);
      
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
    
  }

  static async getTagMappingList(req: Request, res: Response): Promise<any> {
    try {
      let queryPayload: queryPayload = {
        order: [['tag_id', 'ASC']],
      };
      const result: any = await tagMappingQuery.findAndCountAll(queryPayload);
  
      if (result.count === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);
  
      return { data: result.rows}
    } catch (error) {
      console.log('error', error);
      
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
    
  }

  static async upsertTag(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
        await tagQuery.insert({
          name: req.body.name
        }, {
          transaction
        });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
        console.log('[TagService][upsertTag]', error);
    }
  }

  static async upsertTagMapping(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
        await tagMappingQuery.destroy(
        {
          where: { news_id: req.body.news_id },
          transaction
        });
        let insertTag: any[] = [];
        for (const iterator of Array(...req.body.tag_ids)) {
          insertTag.push(
             tagMappingQuery.insert(
              {
                news_id: req.body.news_id,
                tag_id: iterator
              },
              {
                transaction
              }
            )
          );
        }

        insertTag = await Promise.all(insertTag);
      
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
        console.log('[TagService][upsertTagMapping]', error);
    }
  }
}
