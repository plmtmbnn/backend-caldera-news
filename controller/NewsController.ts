import { Request, Response } from "express";

import { NewsService } from "../service/NewsService";
import { LikeService } from "../service/LikeService";
import { CommentService } from "../service/CommentService";

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
            status: Joi.string().allow(null).optional(),
            category_id: Joi.number().optional(),
            posted_at: Joi.string().optional(),
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

  async getNewsList(req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        news_id: Joi.string().uuid().allow(null).optional(),
        title: Joi.string().allow("", null).optional(),
        author_id: Joi.number().optional(),
        status: Joi.string().allow(null, 'PUBLISH', 'DRAFT').optional(),
        category_id: Joi.number().allow(null).optional(),
        limit: Joi.number().allow(null).optional(),
        offset: Joi.number().allow(null).optional(),
        is_recommendation: Joi.boolean().allow(null).optional(),
        is_trending: Joi.boolean().allow(null).optional(),
      });

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
        const result: any = await NewsService.getNewsList(req, res);
        ResponseHandler.send(res, result);
        }
    } catch (error) {
      console.log("[NewsController][getNewsList]", error);
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertLike(req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        news_id: Joi.string().required(),
        user_id: Joi.number().required()
      });

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
        const result: any = await LikeService.upsertLike(req, res);
        ResponseHandler.send(res, result);
        }
    } catch (error) {
      console.log("[NewsController][upsertLike]", error);
      ResponseHandler.send(res, error, true);
    }
  }

  async getLikes(req: Request, res: Response): Promise<void> {
    try {
      const result: any = await LikeService.getLikes(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      console.log("[NewsController][getLikes]", error);
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertComment(req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        news_id: Joi.string().required(),
        user_id: Joi.number().required(),
        comment: Joi.string().required()
      });

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
        const result: any = await CommentService.upsertComment(req, res);
        ResponseHandler.send(res, result);
        }
    } catch (error) {
      console.log("[NewsController][upsertComment]", error);
      ResponseHandler.send(res, error, true);
    }
  }

  async getComment(req: Request, res: Response): Promise<void> {
    try {
      const result: any = await CommentService.getComments(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      console.log("[NewsController][getComment]", error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const newsController = new NewsController();
