import express, {Application} from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.ts";
import cloudinaryRoutes from "./routes/cloudinary.ts";
import heroRoutes from "./routes/hero.ts";
import contactRoutes from "./routes/contact.ts";

const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string) || 8081;

app.use(cors());
app.use(express.json());

//Routes:
app.use("/auth", authRoutes);
app.use("/upload", cloudinaryRoutes);
app.use("/hero", heroRoutes);
app.use("/contact", contactRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})