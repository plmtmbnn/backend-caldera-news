import { Request, Response } from 'express';

import { EXCEPTION_MESSAGE } from '../helper/EXCEPTION_MESSAGE';
import { CustomException } from '../helper/CustomException';
import { HttpHelper } from '../helper/HttpHelper';

import {
  userQuery, authorQuery
} from '../sequelize/query';
import { sequelize } from '../sequelize/init';
import { Op, col, fn, where, literal } from 'sequelize';
import { queryPayload } from 'helper/QueryPayload';


export class AuthService {
  static async login(req: Request, res: Response): Promise<any> {
    const transaction = await sequelize.transaction();

    try {
      const currentSession: any = req.session;
      const { user } = await currentSession.passport;
      if (user && user.id && user.displayName) {
        let queryPayload: queryPayload = {
          where: {
            status: true,
            facebook_id: user.id
          }
        };

        let result: any = await userQuery.findAndCountAll(queryPayload);

        if (result.count === 0) {
          result.count = 1;
          result.rows = await userQuery.insert({
            full_name: user.displayName,
            facebook_id: String(user.id).toString(),
            register_via: String(user.provider).toString(),
            login_response: user,
            status: true
          }, { transaction });
          (await transaction).commit();
        }

        if (result.count > 0) {
          const author: any = await authorQuery.findAndCountAll({
            where: { user_id: result.rows[0].id }
          });
          let isAdmin: boolean = false;
          if (author.count > 0) isAdmin = true;
          return {
            data: {
              id: result.rows[0].id, 
              full_name: result.rows[0].full_name,
              avatar_url: result.rows[0].avatar_url,
              created_at: result.rows[0].created_at,
              isAdmin
            }
          };
        } else {
          throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHENTICATED);
        }
      } else {
        throw new CustomException(EXCEPTION_MESSAGE.DATA_NOT_FOUND);
      }
    } catch (error) {
      (await transaction).rollback();
      console.log('[AuthService][login]', error);
      throw new CustomException(EXCEPTION_MESSAGE.SYSTEM_ERROR);
    }
  }
}
