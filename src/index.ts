import express, {Application} from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.ts";
import cloudinaryRoutes from "./routes/cloudinary.ts";
import heroRoutes from "./routes/hero.ts";
import featuredRoutes from "./routes/featured.ts";
import aboutRoutes from "./routes/about.ts";
import connectRoutes from "./routes/connect.ts";
import contactRoutes from "./routes/contact.ts";


const app: Application = express();
const PORT: number = parseInt(process.env.PORT as string) || 8081;

app.use(cors());
app.use(express.json());

//Routes:
app.use("/auth", authRoutes);
app.use("/upload", cloudinaryRoutes);
app.use("/hero", heroRoutes);
app.use("/featured", featuredRoutes);
app.use("/about", aboutRoutes);
app.use("/connect", connectRoutes);
app.use("/contact", contactRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})