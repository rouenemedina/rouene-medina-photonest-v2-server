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
  files?: Express.Multer.File[] | {[fieldname: string]: Express.Multer.File[]};
}

//POST /upload
const uploadImgHandler = (table_name: string) => {
  return async (req: DynamicUploadRequest, res: Response) => {
    try {
      const singleFile = req.file;
      let multipleFiles: Express.Multer.File[] = [];
      //check for type(an array or an object)
      if (Array.isArray(req.file)) {
        multipleFiles
      } else if (typeof req.files) {

      }

      const { ...bodyFields } = req.body as DynamicUploadBody;

      console.log(bodyFields);
  
      const validationError = validateFileAndUser({
        files: singleFile ? [singleFile] : multipleFiles || [],
        user_id: bodyFields.user_id,
      });
  
      if (validationError) {
        return res.status(validationError.status).json(validationError);
      }

      let imageUrls: string[] = [];
      //single file handling
      if (singleFile) {
        const imageUrl = await uploadFilesToCloudinary({ filePaths: [singleFile!.path] });
        const keyName = `${table_name}_url`;
        const newImg = {
          ...bodyFields,
          [keyName]: imageUrl[0],
        };
  
        await knex(table_name).insert(newImg);
        handleFileDeletion({ filePaths: [singleFile!.path] });
      } else if (multipleFiles && multipleFiles.length > 0) {
        //multiple file handling
        const filePaths = multipleFiles.map(file => file.path);
        const imageUrls = await uploadFilesToCloudinary({ filePaths });
        const keyName = `${table_name}_url`;
        const newImgs = imageUrls.map((url, index) => ({
          ...bodyFields, 
          [keyName]: url,
        }));
        await knex(table_name).insert(newImgs);
        handleFileDeletion({ filePaths });
      }
      res.json({ urls: imageUrls });
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
