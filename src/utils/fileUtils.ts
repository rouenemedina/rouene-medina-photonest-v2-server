import fs from "fs";
import { uploadToCloudinaryUsingAxios } from "./cloudinaryUtils";

interface FileValidationBody {
  files: Express.Multer.File[];
  user_id: number;
}

interface FilesBody {
  filePaths: string[];
}

const validateFileAndUser = ({ files, user_id }: FileValidationBody) => {
  if (files.length === 0) {
    return { status: 400, message: "No files uploaded", error: "400" };
  }
  if (!user_id) {
    return { status: 400, message: "Authentication error", error: "400" };
  }
  return null;
};

const uploadFilesToCloudinary = async ({ filePaths }: FilesBody) => {
  return await Promise.all(
    filePaths.map(async(path) => {
      return await uploadToCloudinaryUsingAxios(path);
    })
  );
};

const handleFileDeletion = ({ filePaths }: FilesBody) => {
  filePaths.forEach((path) => {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  });
};

export { validateFileAndUser, handleFileDeletion, uploadFilesToCloudinary };
