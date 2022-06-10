import sharp from "sharp";

import {makeid} from './StringManipulation';

export class FileHelper {
  static async saveAndResizeFile(file: any, path: string): Promise<any> {
    const filename: string = `${makeid(8)}.png`;

    let result: any = {
      status: false,
      filename,
    };

    try {
      await sharp(file.filepath)
        .resize({ height: 500 })
        .jpeg()
        .toFile(path + filename)
        .then(function (newFileInfo) {
          // newFileInfo holds the output file properties
          result.status = true;
        })
        .catch(function (err) {
          console.log("Error occured", err);
        });
    } catch (error) {
      console.log("[FileHelper][saveAndResizeFile]", error);
    }
    return result;
  }
}
