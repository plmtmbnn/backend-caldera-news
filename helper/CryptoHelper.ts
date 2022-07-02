import CryptoJS from 'crypto-js';

export const encrypt = (value: string) => {
  let result: string = CryptoJS.AES.encrypt(value, process.env.SECRET_KEY).toString();
  return result;
}

export const decrypt = (value: string) => {
  let result: string = CryptoJS.AES.decrypt(value, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
  return result;
}