import { Request, Response } from 'express';
import { CategoryService } from '../service/CategoryService';
import { ResponseHandler } from '../helper/ResponseHandler';

export class CategoryController {
  async getCategory (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await CategoryService.getCategoryList(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }
}

export const categoryController = new CategoryController();
