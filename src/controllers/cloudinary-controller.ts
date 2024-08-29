import initKnex from "knex";
import configuration from "../configurations/knexfile.ts";
import { Request, Response } from "express";
import { handleFileDeletion, uploadFilesToCloudinary, validateFileAndUser } from "utils/fileUtils.ts";

const knex = initKnex(configuration);

interface UploadBody {
  image_title?: string;
  image_description?: string;
  image_tags?: string;
  image_timestamp: Date;
  user_id: number;
  category_id: number;
  table_name: string;
}

interface UploadRequest extends Request {
  file?: Express.Multer.File;
}

//POST /upload
const uploadImg = async (req: UploadRequest, res: Response) => {
  try {
    const file = req.file;
    const {
      image_title,
      image_description,
      image_tags,
      image_timestamp,
      user_id,
      category_id,
      table_name
    } = req.body as UploadBody;

    const validationError = validateFileAndUser({ files: file ? [file] : [], user_id });

    if (validationError) {
      return res.status(validationError.status).json(validationError)
    }

    //check if category_id exist
    if (!category_id) {
      return res.status(400).json({
        message: "No category ID provided.",
        error: "400",
      });
    }

    const imageUrl = await uploadFilesToCloudinary({ filePaths: [file!.path] });

    const newImg = {
      image_title,
      image_description,
      image_tags,
      image_timestamp,
      category_id,
      user_id,
      image_url: imageUrl[0],
    };
    console.log(newImg);

    await knex(table_name).insert(newImg);
    handleFileDeletion({ filePaths: [file!.path] });

    res.json({ url: imageUrl });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Unexpected error occured. Please try again.",
      error: "500",
    });
  }
};

export { uploadImg };
