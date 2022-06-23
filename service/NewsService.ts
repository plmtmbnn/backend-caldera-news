import { Request, Response } from "express";

import { EXCEPTION_MESSAGE } from "../helper/EXCEPTION_MESSAGE";
import { CustomException } from "../helper/CustomException";

import { newsQuery, newsCommentQuery, newsLikeQuery } from "../sequelize/query";
import { sequelize } from "../sequelize/init";
import { Op, col, fn, where, literal } from "sequelize";

//helper
import { queryPayload } from "../helper/QueryPayload";
import { FileHelper } from "../helper/FileHelper";
import { generateNewsUrl } from "../helper/StringManipulation";
import moment from "moment";

export class NewsService {
  static async upsertNews(req: Request, res: Response): Promise<any> {
    let image_url: string = undefined;
    if (req.body.file) {
      const uploadStatus: any = await FileHelper.saveAndResizeFile(
        req.body.file,
        "./image/"
      );
      image_url = uploadStatus.status ? uploadStatus.filename : undefined;
    }

    const transaction = await sequelize.transaction();
    try {
      let checkNews: any = null;
      if (req.body.news_id) {
        checkNews = await newsQuery.findAndCountAll({
          where: { id: req.body.news_id },
          transaction,
        });
      }

      let news_url: string = `${moment().format(
        "YYMMDD-HH-mm-ss"
      )}_${generateNewsUrl(req.body.title || "Tidak Ada Judul")}`;

      if (req.body.news_id && checkNews && checkNews.count > 0) {
        await newsQuery.update(
          {
            news_url,
            title: req.body.title,
            image_url,
            content: req.body.content,
            status: req.body.status,
            category_id: req.body.category_id || undefined,
            posted_at: req.body.posted_at || undefined,
          },
          {
            where: { id: req.body.news_id },
            transaction,
          }
        );
      } else {
        await newsQuery.insert(
          {
            news_url,
            title: req.body.title,
            image_url,
            content: req.body.content,
            status: req.body.status,
            category_id: req.body.category_id || undefined,
            posted_at: req.body.posted_at || undefined,
          },
          {
            transaction,
          }
        );
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("[NewsService][upsertNews]", error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }

  static async getNews(req: Request, res: Response): Promise<any> {
    let queryPayload: queryPayload = {
      where: {
        news_url: req.params.news_url,
      },
      order: [["id", "ASC"]],
    };
    const result: any = await newsQuery.findAndCountAll(queryPayload);

    if (result.count === 0)
      throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    const likes: any = await newsLikeQuery.findAndCountAll({
      where: { news_id: result.rows[0].id },
    });

    const comments: any = await newsCommentQuery.findAndCountAll({
      where: { news_id: result.rows[0].id },
      order: [["created_at", "DESC"]],
    });

    return {
      data: {
        news: result.rows[0],
        likes: likes.count,
        comments: comments.count > 0 ? comments.row : [],
      },
    };
  }

  static async getNewsList(req: Request, res: Response): Promise<any> {
    let queryPayload: queryPayload = {
      where: {},
      order: [["id", "ASC"]],
    };
    const result: any = await newsQuery.getNewsDetail(queryPayload);
    
    if (result.count === 0)
      throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    return { data: result.rows };
  }
}
