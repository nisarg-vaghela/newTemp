import express from 'express';
import connect from './database/conn.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
const port = process.env.PORT || 8080;

// import model
import FoodItems from './model/foodItem.model.js';
import Photos from './model/photo.model.js';
import User from './model/user.model.js';



/** GET: http://localhost:8080/getFoodItems */
app.get('/getFoodItems', (req, res) => {
    try{
        FoodItems.find({}).then(data => {
            console.log(data);
            res.json(data);
        }).catch(error => {
            res.status(408).json({ error })
        })
    }catch(error){
        res.json({error})
    }
})

/** GET: http://localhost:8080/getPhotos */
app.get('/getPhotos', (req, res) => {
    try{
        Photos.find({}).then(data => {
            console.log(data);
            res.json(data);
        }).catch(error => {
            res.status(408).json({ error })
        })
    }catch(error){
        res.json({error})
    }
})


app.get('/getLoginPhoto', async (req, res) => {
  try {
    const photo = await Photos.findOne({ name: 'login photo' });

    if (!photo) {
      return res.status(404).json({ message: 'Photo not found' });
    }

    res.json(photo);
  } catch (err) {
    console.error('Error fetching photo:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


/** POST: http://localhost:8080/uploads  */
app.post("/uploads", async (req, res) => {
    const body = req.body;
    console.log(body)
    try{
        const newImage = await Photos.create(body)
        
        newImage.save();
        res.status(201).json({ msg : "New image uploaded...!"})
    }catch(error){
        res.status(409).json({ message : error.message })
    }
})

connect().then(() => {
    console.log("heerererere");
    try{
        app.listen(port, () => {
            console.log(`Server connected to http://localhost:${port}`);
        })
    }catch(error){
        console.log("Can't connect to the server");
    }
}).catch((error) => {
    console.log("Invalid Database Connection...!")
})

