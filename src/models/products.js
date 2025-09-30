import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    // Aqui modelo el objeto
    nameProduct: {
        type: String,
        required: true,
        minLength:2,
        maxLength: 100,
        unique: true
    }, 
    price: {
        type: Number,
        required: true,
        min: 50,
        max: 100000
    },
})

const Product = mongoose.model('product', productSchema)

export default Product;