import "dotenv/config";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { CloudinaryConfig } from "../configurations/cloudinaryConfig";

interface UploadToCloudinary {
  (filePath: string): Promise<string>;
}

interface CloudinaryUploadResponse {
  url: string;
}

const uploadToCloudinaryUsingAxios: UploadToCloudinary = async (filePath) => {
  try {
    const formData = new FormData();
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CloudinaryConfig.cloudName}/image/upload`;
    const fileStream = fs.createReadStream(filePath);
    formData.append("file", fileStream);
    formData.append("upload_preset", "photonest_unsigned");
    formData.append("api_key", CloudinaryConfig.cloudKey);

    const response = await axios.post<CloudinaryUploadResponse>(
      cloudinaryUrl,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Basic ${Buffer.from(
            `${CloudinaryConfig.cloudKey}:${CloudinaryConfig.cloudSecret}`
          ).toString("base64")}`,
        },
      }
    );
    return response.data.url;
  } catch (err) {
    console.log("Error uploading file", err);
    throw err;
  }
};

export { uploadToCloudinaryUsingAxios };
