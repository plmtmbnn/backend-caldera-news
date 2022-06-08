import { NextFunction, Request, Response } from 'express';
import { ResponseHandler } from '../helper/ResponseHandler';
import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {    
  if (req.isAuthenticated()) {
    return next();
  }
  ResponseHandler.send(res, EXCEPTION_MESSAGE.NOT_AUTHENTICATED);
}