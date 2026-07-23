import mongoose from "mongoose"

const productSchema= new mongoose.Schema({
    image: {
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
        enum: ["Electronics", "Clothes", "SkinCare", "Footwear"]
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min:0
    }
},{timestamps: true})

export const Product= mongoose.model("Product",productSchema)