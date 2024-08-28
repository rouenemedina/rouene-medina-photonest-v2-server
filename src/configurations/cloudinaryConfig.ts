import "dotenv/config";

interface CloudinaryConnectionConfig {
    cloudName: string | undefined;
    cloudSecret: string | undefined;
    cloudKey: string | undefined;
}

const CloudinaryConfig: CloudinaryConnectionConfig = {
    cloudName: process.env.CLOUD_NAME,
    cloudSecret: process.env.CLOUD_SECRET,
    cloudKey: process.env.CLOUD_KEY
};

export { CloudinaryConfig };