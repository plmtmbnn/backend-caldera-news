import { Request, Response } from "express";

import { EXCEPTION_MESSAGE } from "../helper/EXCEPTION_MESSAGE";
import { CustomException } from "../helper/CustomException";

import { newsQuery, newsCommentQuery, newsLikeQuery, newsViewLogQuery, imageQuery, tagMappingQuery } from "../sequelize/query";
import { sequelize } from "../sequelize/init";
import { Op, col, fn, where, literal } from "sequelize";

//helper
import { queryPayload } from "../helper/QueryPayload";
import { FileHelper } from "../helper/FileHelper";
import { generateNewsUrl } from "../helper/StringManipulation";
import moment from "moment";
import fs from 'fs';
import path from 'path';

export class NewsService {
  static async upsertNews(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      let image_url: string = undefined;
      if (req.body.file) {
        const uploadStatus: any = await FileHelper.saveAndResizeFile(
          req.body.file,
          "./image/news/"
        );
        image_url = uploadStatus.status ? uploadStatus.filename : undefined;
      }

      let checkNews: any = null;
      if (req.body.news_id) {
        checkNews = await newsQuery.findAndCountAll({
          where: { id: req.body.news_id },
          transaction,
        });
      }

      let news_url: string = `${moment().format(
        "YYMMDD-HH-mm-ss"
      )}_${generateNewsUrl(req.body.title || "Tidak Ada Judul Berita")}`;

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
            image_desc: req.body.image_desc || undefined,
            is_recommendation: req.body.is_recommendation,
            is_trending: req.body.is_trending,
            origin_author_name: req.body.origin_author_name || undefined
          },
          {
            where: { id: req.body.news_id },
            transaction,
          }
        );

        if(req.body.tag_ids) {
          const tag_ids = JSON.parse(req.body.tag_ids);
          
          await tagMappingQuery.destroy(
            {
              where: { news_id: req.body.news_id },
              transaction
            });

          if(tag_ids?.length && tag_ids.length > 0) {
          
            let insertTag: any[] = [];

            for (let index = 0; index < tag_ids.length; index++) {

              console.log({
                news_id: req.body.news_id,
                tag_id: tag_ids[index]
              });
              
              insertTag.push(
                tagMappingQuery.insert(
                 {
                   news_id: req.body.news_id,
                   tag_id: tag_ids[index]
                 },
                 {
                   transaction
                 }
               )
             );
            }
    
            insertTag = await Promise.all(insertTag);
          }
        }
      } else {
        const news: any = await newsQuery.insert(
          {
            news_url,
            title: req.body.title,
            image_url,
            content: req.body.content,
            status: req.body.status,
            category_id: req.body.category_id || undefined,
            posted_at: req.body.posted_at || undefined,
            author_id: req.body.author_id || undefined,
            image_desc: req.body.image_desc || undefined,
            is_recommendation: req.body.is_recommendation,
            is_trending: req.body.is_trending,
            origin_author_name: req.body.origin_author_name || undefined,
            like_count: Math.floor((Math.random() * 500))
          },
          {
            transaction,
          }
        );

        let tag_ids: any[] = [];
        if(req.body.tag_ids){
          tag_ids = JSON.parse(req.body.tag_ids);
        }

        await tagMappingQuery.destroy(
          {
            where: { news_id: news.id },
            transaction
          });

        if(tag_ids.length > 0) {
          
            let insertTag: any[] = [];

            for (let index = 0; index < tag_ids.length; index++) {
              insertTag.push(
                tagMappingQuery.insert(
                 {
                  news_id: news.id,
                   tag_id: tag_ids[index]
                 },
                 {
                   transaction
                 }
               )
             );
            }
    
            insertTag = await Promise.all(insertTag);
        }
        
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("[NewsService][upsertNews]", JSON.stringify(req.body), error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }

  static async deleteNews(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
    
      if (req.params.news_id) {
        await tagMappingQuery.destroy(
          {
            where: { news_id: req.params.news_id },
            transaction
          });

        await newsQuery.destroy(
          {
            where: { id: req.params.news_id },
            transaction,
          }
        );
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("[NewsService][deleteNews]", JSON.stringify(req.body), error);
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
    
    const tags: any = await tagMappingQuery.findAndCountAll({
      where: { news_id: result.rows[0].id },
      order: [["tag_id", "ASC"]],
    });

    sequelize.transaction(async (transaction: any) => {
        await newsViewLogQuery.insert({
          news_id: result.rows[0].id
        }, {transaction});
    });

    // const file_name: string = path.join(
    //   __dirname, '..', '..', '/metatag', `${req.params.news_url}.json`);

    // this.storeMetaTag(file_name, result.rows[0]);

    return {
      data: {
        news: result.rows[0],
        likes: parseInt(likes.count) + parseInt(result.rows[0].like_count),
        comments: comments.count,
        tags: tags.rows
      },
    };
  }

  static storeMetaTag(file_name: string, data: any){
    try {
      const json: string = JSON.stringify(
        {
          title: data.title,
          image_url: `https://api.caldera.id/news/image/news/${data.image_url}`
        }
        );

      fs.writeFileSync(file_name, json, 'utf8');
    } catch (error) {
      console.log('storeMetaTag error', file_name, error);
      
    }
  }
  static async getNewsById(req: Request, res: Response): Promise<any> {
    let queryPayload: queryPayload = {
      where: {
        id: req.params.id,
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
    
    const tags: any = await tagMappingQuery.findAndCountAll({
      where: { news_id: result.rows[0].id },
      order: [["tag_id", "ASC"]],
    });

    return {
      data: {
        news: result.rows[0],
        likes: parseInt(likes.count) + parseInt(result.rows[0].like_count),
        comments: comments.count,
        tags: tags.rows
      },
    };
  }

  static async getNewsList(req: Request, res: Response): Promise<any> {
    const where: any = {};

    if(req.body.category_id){ where.category_id = req.body.category_id}
    if(req.body.title){ where.title = req.body.title}
    if(req.body.author_id){ where.author_id = req.body.author_id}
    if(req.body.status !== undefined){ where.status = req.body.status}
    if(req.body.is_recommendation !== undefined){ where.is_recommendation = req.body.is_recommendation}
    if(req.body.is_trending !== undefined){ where.is_trending = req.body.is_trending};

    if(req.body.newsType){ 
      switch (req.body.newsType) {
        case 'TRENDING':
          where.is_trending = true;
          break;
        case 'REKOMENDASI':
          where.is_recommendation = true;
          break;      
        default:
          break;
      }
    };


    const limit: number = req.body.limit || undefined;
    const offset: number =  req.body.offset || undefined;
    let queryPayload: queryPayload = {
      where,
      order: [["id", "ASC"]],
      limit,
      offset
    };
    const result: any = await newsQuery.getNewsDetailRaw(queryPayload);
    
    if (result?.length === 0)
      throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);

    const count: number = result && result.length && result.length > 0 ? parseFloat(result[0].total_data) : 0;
    return { data: result, count};
  }

  static async uploadImage(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
      let checkNews: any = null;
      if (req.body.news_id) {
        checkNews = await newsQuery.findAndCountAll({
          where: { id: req.body.news_id },
          transaction,
        });        
      }

      if (req.body.news_id && checkNews && checkNews.count === 0) {
        throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);
      }
      
      let image_url: string = undefined;
      if (req.body.file) {
        const uploadStatus: any = await FileHelper.saveAndResizeFile(
          req.body.file,
          "./image/news/"
        );
        image_url = uploadStatus.status ? uploadStatus.filename : undefined;
      }      

        await imageQuery.insert(
          {
            image_url,
            news_id: req.body.news_id
          },
          {
            transaction,
          }
        );
      
      await transaction.commit();
      return {
        image_url
      }
    } catch (error) {
      await transaction.rollback();
      console.log("[NewsService][uploadImage]", error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }

  static async updateBulkNews(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();
    try {
    
        const result: any = await newsQuery.findAndCountAll(
          {
            where: {},
            transaction
          });

          let aysncUpdate: any[] = [];
        

          for (const iterator of result.rows) {
            if (iterator.image_url) {
              let image_url = String(iterator.image_url).replace('.png', '.jpeg');
              aysncUpdate.push(
                newsQuery.update(
                  {
                    image_url
                  },
                  {
                    where: {
                      id: iterator.id
                    },
                    transaction
                  })
              ); 
            }
          }
          aysncUpdate = await Promise.all(aysncUpdate);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      console.log("[NewsService][deleteNews]", JSON.stringify(req.body), error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }
}
