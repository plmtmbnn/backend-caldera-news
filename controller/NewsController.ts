import { Request, Response } from "express";
import { NewsService } from "../service/NewsService";
import { ResponseHandler } from "../helper/ResponseHandler";
import { EXCEPTION_MESSAGE } from "../helper/EXCEPTION_MESSAGE";
import { CustomException } from "../helper/CustomException";

import Joi from "joi";

import formidable from "formidable";

export class NewsController {
  async upsertNews(req: Request, res: Response): Promise<void> {
    try {
      const form: any = formidable({ multiples: true });
      await form.parse(req, async (err: any, body: any, files: any) => {
        if (!err) {
          const schema: Joi.Schema = Joi.object({
            news_id: Joi.string().uuid().allow(null).optional(),
            title: Joi.string().allow("", null).optional(),
            author_id: Joi.number().required(),
            news_url: Joi.string().allow("", null).optional(),
            content: Joi.string().allow("", null).optional(),
            status: Joi.boolean().allow(null).optional(),
            category_id: Joi.number().optional(),
            file: Joi.object({
              type: Joi.alternatives().try(
                Joi.string().regex(/image/)
              )
            }).options({ allowUnknown: true }).optional()
          });

          req.body = { ...body, ...files };

          const validationResult: any = schema.validate(req.body);
          if (
            validationResult.error &&
            validationResult.error.details.length > 0
          ) {
            ResponseHandler.send(res, new CustomException({
              ...EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
              error: validationResult.error.details,
            }), true);
          } else {
            const result: any = await NewsService.upsertNews(req, res);
            ResponseHandler.send(res, result);  
          }
        } else {
          ResponseHandler.send(res, new CustomException({
            ...EXCEPTION_MESSAGE.SYSTEM_ERROR
          }), true);
        }
      });
    } catch (error) {
      console.log("[NewsController][upsertNews]", error);
      ResponseHandler.send(res, error, true);
    }
  }

  async getNews(req: Request, res: Response): Promise<void> {
    try {
      const result: any = await NewsService.getNews(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      console.log("[NewsController][getNews]", error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const newsController = new NewsController();
