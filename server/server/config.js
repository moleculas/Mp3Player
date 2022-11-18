import dotenv from "dotenv";
import path from "path";
import os from 'os';

dotenv.config();

export const MONGODB_URI =
    process.env.MONGODB_URI || "mongodb://localhost/bbddMusicPlayer";
export const PORT = process.env.PORT || 3100;
const hostname = os.platform();
let preRuta;
if (hostname === 'win32') {
    preRuta = '../../client/public/';
} else {
    preRuta = '../../client/';
};
const elPathPublic = path.join(__dirname, preRuta);
export const RUTA_PUBLIC = elPathPublic;
const elPathImages = path.join(__dirname, preRuta + 'images/');
export const RUTA_FILES_IMAGES = elPathImages;
const elPathFiles = path.join(__dirname, preRuta + 'files/');
export const RUTA_FILES_FILES = elPathFiles;
