import mongoose from "mongoose";


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

export default mongoose.model('Photos', schema)