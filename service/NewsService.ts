import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';

import {
  newsQuery
} from '../sequelize/query';
import { sequelize } from '../sequelize/init';
import { Op, col, fn, where, literal } from 'sequelize';
import { queryPayload } from 'helper/QueryPayload';


export class NewsService {
  static async upsertNews(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      const checkNews: any = await newsQuery.findAndCountAll({
        where: { id: req.body.news_id }
      });

      let image_url: string = null;
      let news_url: string = null;

      if (req.body.news_id && checkNews.count > 0) {
        await newsQuery.update({
          news_url,
          title: req.body.title,
          image_url,
          content: req.body.content,
          status: req.body.status,
          category_id: req.body.category_id,
          posted_at: req.body.posted_at
        },
          {
            where: { id: req.body.news_id },
            transaction
          });
      } else {
        await newsQuery.insert({
          news_url,
          title: req.body.title,
          image_url,
          content: req.body.content,
          status: req.body.status,
          author_id: req.body.author_id,
          category_id: req.body.category_id,
          posted_at: req.body.posted_at
        },
          {
            transaction
          });
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log('[NewsService][upsertNews]', error);
    }
  }

  static async getNews(req: Request, res: Response): Promise<any> {
    let queryPayload: queryPayload = {
      where: {
        news_url: req.params.news_url
      },
      order: [['id', 'ASC']]
    };
    const result: any = await newsQuery.getNewsDetail(queryPayload);

    if (result.rowCount === 0) throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    return { data: result.rows }
  }
}
