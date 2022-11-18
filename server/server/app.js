import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import indexRoutes from "./routes/index.routes";
import authRoutes from "./routes/auth.routes";
import artistsRoutes from "./routes/artists.routes";
import albumsRoutes from "./routes/albums.routes";
import songsRoutes from "./routes/songs.routes";

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//files
app.use(
    fileUpload({
        tempFileDir: "./upload",
        useTempFiles: true,
    })
);

//routes
app.use('/api', indexRoutes);
app.use('/api/users', authRoutes);
app.use('/api/artists', artistsRoutes);
app.use('/api/albums', albumsRoutes);
app.use('/api/songs', songsRoutes);

export { app };