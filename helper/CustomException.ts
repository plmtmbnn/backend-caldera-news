import { EXCEPTION_MESSAGE } from './EXCEPTION_MESSAGE';

export class CustomException {
  obj: any;
  systemLog: string;
  constructor (obj: any = EXCEPTION_MESSAGE.SYSTEM_ERROR, systemLog?: string) {
    this.obj = obj;
    this.systemLog = systemLog;
  }
}
