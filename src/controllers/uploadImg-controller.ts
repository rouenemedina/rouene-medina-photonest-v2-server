import initKnex from "knex";
import configuration from "../configurations/knexfile.ts";
import { Request, Response } from "express";
import {
  handleFileDeletion,
  uploadFilesToCloudinary,
  validateFileAndUser,
} from "utils/fileUtils.ts";

const knex = initKnex(configuration);

interface DynamicUploadBody extends Record<string, any> {
  user_id: number;
  category_id?: number;
  table_name: string;
}

interface DynamicUploadRequest extends Request {
  file?: Express.Multer.File;
}

//POST /upload
const uploadImgHandler = (table_name: string) => {
  return async (req: DynamicUploadRequest, res: Response) => {
    try {
      const file = req.file;
      const { ...bodyFields } = req.body as DynamicUploadBody;

      console.log(bodyFields);
  
      const validationError = validateFileAndUser({
        files: file ? [file] : [],
        user_id: bodyFields.user_id,
      });
  
      if (validationError) {
        return res.status(validationError.status).json(validationError);
      }
  
      //check if category_id exist
      // if (!bodyFields.category_id) {
      //   return res.status(400).json({
      //     message: "No category ID provided.",
      //     error: "400",
      //   });
      // }
  
      const imageUrl = await uploadFilesToCloudinary({ filePaths: [file!.path] });
  
      const keyName = `${table_name}_url`;
      const newImg = {
        ...bodyFields,
        [keyName]: imageUrl[0],
      };
      console.log(newImg);
  
      await knex(table_name).insert(newImg);
  
      handleFileDeletion({ filePaths: [file!.path] });
  
      res.json({ url: imageUrl });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "An unexpected error occured. Please try again.",
        error: "500",
      });
    }
  };
}


export { uploadImgHandler };
