import express from 'express';
import connect from './database/conn.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
const port = process.env.PORT || 8080;

// import model
import Post from './model/post.model.js';

/** GET: http://localhost:8080 */
app.get('/', (req, res) => {
    try{
        Post.find({}).then(data => {
            res.json(data)
        }).catch(error => {
            res.status(408).json({ error })
        })
    }catch(error){
        res.json({error})
    }
})

/** POST: http://localhost:8080/uploads  */
app.post("/uploads", async (req, res) => {
    const body = req.body;
    try{
        const newImage = await Post.create(body)
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

