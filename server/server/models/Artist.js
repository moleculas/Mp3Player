import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
        },
        twitter: {
            type: String,
        },
        instagram: {
            type: String,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model('Artist', ArtistSchema);