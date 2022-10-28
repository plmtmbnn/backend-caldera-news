import { Request, Response } from 'express';
import { OriginAuthorService } from '../service/OriginAuthorService';
import { ResponseHandler } from '../helper/ResponseHandler';
import { EXCEPTION_MESSAGE } from "../helper/EXCEPTION_MESSAGE";
import { CustomException } from "../helper/CustomException";


import Joi from "joi";

export class OriginAuthorController {
  async getOriginAuthor (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await OriginAuthorService.getOriginAuthor(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      ResponseHandler.send(res, error, true);
    }
  }

  async upsertOriginAuthor (req: Request, res: Response): Promise<void> {
    try {
      const schema: Joi.Schema = Joi.object({
        full_name: Joi.string().required()
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
        const result: any = await OriginAuthorService.upsertOriginAuthor(req, res);
        ResponseHandler.send(res, result);
        }
    } catch (error) {
      console.log("[OriginAuthorController][upsertOriginAuthor]", error);
      ResponseHandler.send(res, error, true);
    }
  }
}

export const originAuthorController = new OriginAuthorController();
