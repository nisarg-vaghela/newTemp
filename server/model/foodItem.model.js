import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
});

export default mongoose.models.foodItems || mongoose.model("FoodItems", schema);
