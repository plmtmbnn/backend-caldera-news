import { Request, Response } from 'express';

import {
  newsCommentQuery
} from '../sequelize/query';

import { sequelize } from "../sequelize/init";

export class CommentService {
  static async upsertComment(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
        await newsCommentQuery.insert({
          news_id: req.body.news_id,
          user_id: req.body.user_id,
          comment: req.body.comment
        }, {
          transaction
        });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
        console.log('[CommentService][upsertComment]', error);
    }
  }

  static async getComments(req: Request, res: Response): Promise<any> {
    const comments: any = await newsCommentQuery.findAndCountAll({
      where: { news_id: req.params.news_id },
      order: [['id', 'ASC']]
    });
    
    return {
      data: {
        comments_count: comments.count,
        comments: comments.rows
      }
    }
  }
}
