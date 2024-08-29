import initKnex from "knex";
import multer from "multer";
import fs from "fs";
import configuration from "../configurations/knexfile.ts";
import { Request, Response } from "express";
import { uploadToCloudinaryUsingAxios } from "../utils/cloudinaryUtils.ts";

const knex = initKnex(configuration);

interface UploadBody {
  image_title?: string;
  image_description?: string;
  image_tags?: string;
  image_timestamp: Date;
  user_id: number;
  category_id: number;
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
    } = req.body as UploadBody;

    //check if file exist
    if (!file) {
      return res.status(400).json({
        message: "No file uploaded.",
        error: "400",
      });
    }

    //check if category_id exist
    if (!category_id) {
      return res.status(400).json({
        message: "No category ID provided.",
        error: "400",
      });
    }

    //check if user_id exist
    if (!user_id) {
      return res.status(400).json({
        message: "No user ID provided.",
        error: "400",
      });
    }

    const imageUrl = await uploadToCloudinaryUsingAxios(file.path);

    const newImg = {
      image_title,
      image_description,
      image_tags,
      image_timestamp,
      category_id,
      user_id,
      image_url: imageUrl,
    };
    console.log(newImg);

    //TODO: create table/refactor code to delete this portion where there is a need for a table
    await knex("").insert(newImg);
    fs.unlinkSync(file.path);
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
