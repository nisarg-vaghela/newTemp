import mongoose from "mongoose";

// const postSchema = new mongoose.Schema({
//     photo : String
// });

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

// const schema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: String,
//         required: true,
//     },
//     type: {
//         type: String,
//         required: true,
//     },
//     photo: {
//         type: String,
//         required: true,
//     },
// });

export default mongoose.model('Photos', schema)


// export default mongoose.models.foodItems || mongoose.model("FoodItems", schema);
