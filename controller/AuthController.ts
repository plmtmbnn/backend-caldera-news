import { Request, Response } from 'express';
import { AuthService } from '../service/AuthService';
import { ResponseHandler } from '../helper/ResponseHandler';

export class AuthController {
  async login (req: Request, res: Response): Promise<void> {
    try {
      const result: any = await AuthService.login(req, res);
      ResponseHandler.send(res, result);
    } catch (error) {
      console.log('[AuthController][login]', error);      
      ResponseHandler.send(res, error, true);
    }
  }
}

export const authController = new AuthController();
