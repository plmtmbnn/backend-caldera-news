import { Request, Response, NextFunction } from 'express';
import { verifyToken } from './jwt';
import Redis from './redis';
import { ResponseHandler } from '../helper/ResponseHandler';
import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';

export async function isLoggedIn (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (req.headers.authorization) {
      const tokenHeader = req.headers.authorization;
        const jwtValue = verifyToken(tokenHeader);        
        const user_id = jwtValue.user_id;
        const email = jwtValue.email;
        const redisSession = new Redis();
        const resultUserToken: any = await redisSession.get(`${user_id}-${email}`);
        
        if (verifyToken(resultUserToken).user_id === user_id) {
          next();
        } else {
          ResponseHandler.send(res, EXCEPTION_MESSAGE.NOT_AUTHENTICATED);
        }
      } else {
        ResponseHandler.send(res, EXCEPTION_MESSAGE.NOT_AUTHENTICATED);
      }
  } catch (e) {
    ResponseHandler.send(res, EXCEPTION_MESSAGE.NOT_AUTHENTICATED);
  }
}