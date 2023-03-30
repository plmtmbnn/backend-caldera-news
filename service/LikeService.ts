import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from "../helper/EXCEPTION_MESSAGE";
import { CustomException } from "../helper/CustomException";

import fs from 'fs';
import path from 'path';

import {
  newsLikeQuery,
  imageQuery
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

  static async getImage(req: Request, res: Response): Promise<any> {
    try {
      const path_name: string = req.params.path_name;
      const file_name: string = req.params.file_name;
      let current_path: string = null;
      
      if(path_name && file_name){
        current_path = path.join(__dirname, '..', '..', 'image',`${path_name}/${file_name}`);
      }

      const binary = fs.readFileSync(current_path);
      res.writeHead(200, { 'Content-Type': 'image/jpeg', 'Content-Encoding': 'gzip', 'Vary': 'Accept-Encoding', 'Transfer-Encoding': 'chunked' });
      res.end(binary, 'binary');
      
    } catch (error) {
      throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);
    }  
  }

  static async getImageByNewsId(req: Request, res: Response): Promise<any> {
    const images: any = await imageQuery.findAndCountAll({
      where: { news_id: req.params.news_id },
    });
    
    return {
      data: {
        images_count: images.count,
        images: images.rows
      }
    }
  }
}
