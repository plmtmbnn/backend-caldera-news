import { Request, Response } from 'express';
import { CategoryService } from '../service/CategoryService';
import { ResponseHandler } from '../helper/ResponseHandler';
import path from 'path';

export class CategoryController {
  async getCategory (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await CategoryService.getCategoryList(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

  async syncDatabase (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await CategoryService.syncDatabase(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      console.log(error);
      ResponseHandler.send(res, error, true);
    }
  }

  async getMetaTagTitle (req: Request, res: Response): Promise<void> {
    try {
      const file_name: string = path.join(
        __dirname, '..', '..', '/metatag', `${req.params.news_url}.json`);

      const metatag = require(`./${file_name}`);
      const message: string = metatag?.title || 'caldera.id' ;
      res.write(message);
      res.end();
    } catch (error) {
      console.log(error);
      ResponseHandler.send(res, error, true);
    }
  }

  async getMetaTagImage (req: Request, res: Response): Promise<void> {
    try {
      const file_name: string = path.join(
        __dirname, '..', '..', '/metatag', `${req.params.news_url}.json`);

      const metatag = require(`./${file_name}`);
      const message: string = metatag?.image_url || 'https://www.caldera.id/static/media/logo.f22abae4ca373ed8a7b7.png' ;
      res.write(message);
      res.end();
    } catch (error) {
      console.log(error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const categoryController = new CategoryController();
