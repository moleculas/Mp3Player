import { Router } from "express";
import Song from "../models/Song";
import Album from "../models/Album";
import Artist from "../models/Artist";
import jsmediatags from "jsmediatags";
import axios from "axios";
import { RUTA_FILES_FILES, RUTA_FILES_IMAGES } from "../config";
import fs from "fs-extra";
import returnUrl from "../util/returnUrl";

const router = Router();

const downloadImage = (url, image_path) =>
    axios({
        url,
        responseType: 'stream',
    }).then(
        response =>
            new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(image_path))
                    .on('finish', () => resolve())
                    .on('error', e => reject(e));
            }),
    );

const generaConsulta = async (name, artist, album, file, res) => {
    const oldAlbum = await Album.findOne({ name: album });
    const dir = RUTA_FILES_FILES + album;
    if (!oldAlbum) {
        const newAlbum = Album({
            name: album
        });
        await newAlbum.save();
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        };
    };
    const contieneParentesis = name.replace(/\\/g, "separacion");
    if (contieneParentesis.includes("separacion")) {
        const nameSplitted = contieneParentesis.split("separacion");
        const nameSong = nameSplitted[0].slice(0, -1);
        const nameArtist = nameSplitted[1].substring(1);
        name = nameSong;
        artist = nameArtist;
    };
    const contieneParentesis2 = name.replace(/\//g, "separacion");
    if (contieneParentesis2.includes("separacion")) {
        const nameSplitted2 = contieneParentesis2.split("separacion");
        const nameSong2 = nameSplitted2[0].slice(0, -1);
        const nameArtist2 = nameSplitted2[1].substring(1);
        // const nameArtist2 = nameSplitted2[0].slice(0, -1);
        // const nameSong2 = nameSplitted2[1].substring(1);
        name = nameSong2;
        artist = nameArtist2;
    };
    const oldArtist = await Artist.findOne({ name: artist });
    if (!oldArtist) {
        const newArtist = Artist({
            name: artist
        });
        await newArtist.save();
    };
    const dirFile = RUTA_FILES_FILES + album + '/' + file.name;
    const songUrl = album + '/' + file.name;
    await file.mv(dirFile);
    await fs.remove(file.tempFilePath);
    const key = "poNLzZwCxNpADBVKOlCm";
    const secret = "LLysnnoWpCqcYnlVTQnIpfHZihVaAUhp";
    const toSearch = `${artist} - ${name}`;
    const toSearchClean = toSearch.replace(/\&/g, "and");
    axios.get(`https://api.discogs.com/database/search?q=${toSearchClean}&key=${key}&secret=${secret}&page=1&per_page=1`)
        .then(async (response) => {
            const respuesta = response.data;
            let imageURL, category, genre, elFileName;
            if (respuesta.results.length > 0) {
                const image = respuesta.results[0].cover_image;
                if (respuesta.results[0].style) {
                    category = respuesta.results[0].style[0];
                } else {
                    category = "Reggae";
                };
                if (respuesta.results[0].genre) {
                    genre = respuesta.results[0].genre[0];
                } else {
                    genre = "Reggae";
                };
                elFileName = file.name.replace(".mp3", ".jpeg");
                //elFileName= file.name.replace(".MP3", ".jpeg");
                imageURL = album + '-' + elFileName;
                await downloadImage(image, RUTA_FILES_IMAGES + imageURL);
            } else {
                imageURL = 'albums/' + oldAlbum.imageURL;
                category = "Reggae";
            };
            const newSong = Song({
                name,
                imageURL,
                songUrl,
                album,
                artist,
                language: 'English',
                category: category ? category : genre
            });
            await newSong.save();
            res.status(200).send({ success: true, msg: "Canción subida" });
        })
        .catch((error) => {
            console.log(error);
        });
};

const capitalize = (sentence) => {
    const wordsAretornar = sentence.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    return wordsAretornar
};

router.post("/uploadFile", async (req, res) => {
    const { file } = req.files;
    let name, artist, album, preName;
    try {
        /////////////////////////////////////////////
        // const nameSplitted3 = file.name.split(" - ");
        // const nameArtist3 = nameSplitted3[1];
        // const nameSong3 = nameSplitted3[2];
        // name = nameSong3.replace(".mp3", "");
        // artist = nameArtist3;
        //////////////////////////////////////////////
        // const nameSplitted4 = file.name.split(" - ");
        // const nameSong5 = nameSplitted4[1];
        // const nameSplitted5 = nameSplitted4[0].split(". ");
        // const nameArtist5 = nameSplitted5[1];
        // name = nameSong5.replace(".mp3", "");
        // artist = nameArtist5;
        // album = "Trojan Country Reggae Box Set CD3";
        //   generaConsulta(name, artist, album, file, res);
        jsmediatags.read(file.tempFilePath, {
            onSuccess: async (tag) => {
                const tags = tag.tags;
                name = tags.title;
                artist = tags.artist;
                album = tags.album.replace(":", "");
                ///////////////////////
                // preName = tags.title;
                // const nameSplitted4 = preName.split(" - ");
                // artist = nameSplitted4[0];
                // name = nameSplitted4[1];
                /////////////////////////////
                //  preName = tags.artist;
                // const nameSplitted4 = preName.split("- ");
                // artist = nameSplitted4[1];
                // name = nameSplitted4[0];
                /////////////////////////////
                // name = capitalize(tags.title);
                // artist = capitalize(tags.artist);
                //album = "Trojan Slack Reggae Box Set CD3";
                generaConsulta(name, artist, album, file, res);
            },
            onError: (error) => {
                console.log(':(', error.type, error.info);
            }
        });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

router.get("/getAll", async (req, res) => {
    const cursor = await Song.find({}, {
        createdAt: 0,
        updatedAt: 0,
        language: 0,
    });
    // const { rutaFiles, rutaImages } = returnUrl(req);
    // const cursorARetornar = cursor.map((
    //     {
    //         _id,
    //         name,
    //         imageURL,
    //         songUrl,
    //         album,
    //         artist,
    //         category
    //     }
    // ) => (
    //     {
    //         _id,
    //         name,
    //         imageURL: rutaImages + imageURL,
    //         songUrl: rutaFiles + songUrl,
    //         album,
    //         artist,
    //         category
    //     }
    // )); 
    //const cursorShuffle = cursorARetornar.sort((a, b) => 0.5 - Math.random());
    const cursorShuffle = cursor.sort((a, b) => 0.5 - Math.random());
    if (cursorShuffle) {
        res.status(200).send({ success: true, data: cursorShuffle });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    };
});

router.get("/getAllDashboard", async (req, res) => {
    const options = {
        // sort returned documents in ascending order
        sort: { createdAt: 1 },
        // Include only the following
        // projection : {}
    };
    const cursor = await Song.find(options);
    const { rutaFiles, rutaImages } = returnUrl(req);
    const cursorARetornar = cursor.map((
        {
            _id,
            name,
            imageURL,
            songUrl,
            album,
            artist,
            language,
            category
        }
    ) => (
        {
            _id,
            name,
            imageURL: rutaImages + imageURL,
            songUrl: rutaFiles + songUrl,
            album,
            artist,
            language,
            category
        }
    ));
    const reversed = cursorARetornar.reverse();
    if (reversed) {
        res.status(200).send({ success: true, data: reversed });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
});

router.get("/getOne/:getOne", async (req, res) => {
    const filter = { _id: req.params.getOne };
    const { rutaFiles, rutaImages } = returnUrl(req);
    const cursor = await Song.findOne(filter);
    const cursorARetornar = {
        _id: cursor._id,
        name: cursor.name,
        imageURL: rutaImages + cursor.imageURL,
        songUrl: rutaFiles + cursor.songUrl,
        album: cursor.album,
        artist: cursor.artist,
        language: cursor.language,
        category: cursor.category
    };
    if (cursorARetornar) {
        res.status(200).send({ success: true, data: cursorARetornar });
    } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
    }
});

router.post("/save", async (req, res) => {
    const newSong = Song({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songUrl: req.body.songUrl,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
    });
    try {
        const savedSong = await newSong.save();
        res.status(200).send({ song: savedSong });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

router.put("/update/:updateId", async (req, res) => {
    const filter = { _id: req.params.updateId };
    const options = {
        upsert: true,
        new: true,
    };
    try {
        const result = await Song.findOneAndUpdate(
            filter,
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                songUrl: req.body.songUrl,
                album: req.body.album,
                artist: req.body.artist,
                language: req.body.language,
                category: req.body.category,
            },
            options
        );
        res.status(200).send({ artist: result });
    } catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});

router.delete("/delete/:deleteId", async (req, res) => {
    const filter = { _id: req.params.deleteId };
    const result = await Song.deleteOne(filter);
    if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
        res.status(200).send({ success: false, msg: "Data Not Found" });
    }
});

router.get("/getFavouritesSongs", async (req, res) => {
    const query = req.query.songId;
    res.send(query);
});

export default router;