import { Request, Response } from 'express';

import {
  newsLikeQuery
} from '../sequelize/query';

import { sequelize } from "../sequelize/init";

export class LikeService {
  static async upsertLike(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      const likes: any = await newsLikeQuery.findAndCountAll({
        where: { news_id: req.body.news_id, user_id: req.body.user_id },
      });
  
      if(likes.count === 0) {
        await newsLikeQuery.insert({
          news_id: req.body.news_id, user_id: req.body.user_id
        }, {
          transaction
        });
      } else {
        await newsLikeQuery.destroy({
          transaction,
          where: {news_id: req.body.news_id, user_id: req.body.user_id}
        });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
        console.log('[LikeService][upsertLike]', error);
    }
  }

  static async getLikes(req: Request, res: Response): Promise<any> {
    const likes: any = await newsLikeQuery.findAndCountAll({
      where: { news_id: req.params.news_id },
    });
    
    return {
      data: {
        likes_count: likes.count,
        likes: likes.rows
      }
    }
  }
}
