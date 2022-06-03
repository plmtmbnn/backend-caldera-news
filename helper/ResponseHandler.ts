import { EXCEPTION_MESSAGE } from './EXCEPTION_MESSAGE';
import { Response } from 'express';

export class ResponseHandler {
  static send(res: Response, responseHandler: any, isFailed: boolean = false) {
    if (isFailed) {

      if (responseHandler.obj) {
        res.status(responseHandler.obj.code).json({ status: 'FAILED', message: responseHandler.obj.message });
      } else {
        res.status(500).json({ status: 'FAILED', message: EXCEPTION_MESSAGE.SYSTEM_ERROR.message });
      }

      console.log('[EXCEPTION_ERROR] Reference ID: ' + '. ' + JSON.stringify(responseHandler));
    } else {
      res.status(200).json({ status: 'SUCCESS', message: 'SUCCESS', ...responseHandler });
    }
  }
}
