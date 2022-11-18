import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model('Album', AlbumSchema);