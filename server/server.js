import express from 'express';
import connect from './database/conn.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';

// import model
import FoodItems from './model/foodItem.model.js';
import Photos from './model/photo.model.js';
import User from './model/user.model.js';

const app = express();
app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
const port = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get("*", (req, res) => 
 res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

app.post("/signup", async (req, res) => {
    try {
        const { email, password, name, phone } = req.body;
        console.log(email, password, name, phone);
        const isUserExist = await User.findOne({ email });
        if (isUserExist) {
            res.status(400).json({ message: "Email already taken" });
            return
        }
        else {
            const hashedPassword = bcrypt.hashSync(password, 10);
            const newUser = await new User({ email, password: hashedPassword, name, phone }).save();
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            return res.status(200).json({ message: "User created successfully", token, id: newUser._id });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});

app.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            res.status(400).json({ message: "Invalid email or password" });
            return
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token, id: user._id });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
});




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

