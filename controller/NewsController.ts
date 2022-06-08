import { Request, Response } from 'express';
import { NewsService } from '../service/NewsService';
import { ResponseHandler } from '../helper/ResponseHandler';

export class NewsController {
  async getNews(req: Request, res: Response): Promise<void> {
    try {
      const result: any = await NewsService.getNews(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      console.log('[NewsController][getNews]', error);
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertNews(req: Request, res: Response): Promise<void> {
    try {
      const result: any = await NewsService.upsertNews(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      console.log('[NewsController][upsertNews]', error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const newsController = new NewsController();
