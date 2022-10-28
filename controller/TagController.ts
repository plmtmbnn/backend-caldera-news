import { Request, Response } from 'express';
import { TagService } from '../service/TagService';
import { ResponseHandler } from '../helper/ResponseHandler';
import { EXCEPTION_MESSAGE } from "../helper/EXCEPTION_MESSAGE";
import { CustomException } from "../helper/CustomException";


import Joi from "joi";

export class TagController {
  async getTagList (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await TagService.getTag(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

  async getTagMappingList (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await TagService.getTagMappingList(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertTag (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        name: Joi.string().required()
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
        const result: any = await TagService.upsertTag(req, res);
        ResponseHandler.send(res, result);
        }
    } catch (error) {
      console.log("[TagController][upsertTag]", error);
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertTagMapping (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        news_id: Joi.string().required(),
        tag_ids: Joi.array().required(),
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
        const result: any = await TagService.upsertTagMapping(req, res);
        ResponseHandler.send(res, result);
        }
    } catch (error) {
      console.log("[TagController][upsertTagMapping]", error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const tagController = new TagController();
