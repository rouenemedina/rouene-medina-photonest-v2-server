import express, {Application} from "express";
import "dotenv/config";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string) || 8081;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})