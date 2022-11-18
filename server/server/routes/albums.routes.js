import { Router } from "express";
import Album from "../models/Album";
import returnUrl from "../util/returnUrl";

const router = Router();

router.get("/getAll", async (req, res) => {
  const options = {
    // sort returned documents in ascending order
    sort: { createdAt: 1 },
    // Include only the following
    // projection : {}
  };
  const cursor = await Album.find(options);
  // const { rutaAlbum } = returnUrl(req);
  // const cursorARetornar = cursor.map((
  //     {
  //         _id,
  //         name,
  //         imageURL          
  //     }
  // ) => (
  //     {
  //         _id,
  //         name,
  //         imageURL: rutaAlbum + imageURL         
  //     }
  // ));
  if (cursor) {
    res.status(200).send({ success: true, data: cursor });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

router.get("/getOne/:getOne", async (req, res) => {
  const filter = { _id: req.params.getOne };
  const cursor = await Album.findOne(filter);
  const { rutaAlbum } = returnUrl(req);
  const cursorARetornar = {
      _id: cursor._id,
      name: cursor.name,
      imageURL: rutaAlbum + cursor.imageURL    
  };
  if (cursorARetornar) {
    res.status(200).send({ success: true, data: cursorARetornar });
  } else {
    res.status(200).send({ success: true, msg: "No Data Found" });
  }
});

router.post("/save", async (req, res) => {
  const newAlbum = Album({
    name: req.body.name,
    imageURL: req.body.imageURL,
  });
  try {
    const savedAlbum = await newAlbum.save();
    res.status(200).send({ album: savedAlbum });
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
    const result = await Album.findOneAndUpdate(
      filter,
      {
        name: req.body.name,
        imageURL: req.body.imageURL,
      },
      options
    );
    res.status(200).send({ album: result });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.delete("/delete/:deleteId", async (req, res) => {
  const filter = { _id: req.params.deleteId };
  const result = await Album.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});

export default router;