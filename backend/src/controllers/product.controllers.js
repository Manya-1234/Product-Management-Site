import { Product } from "../models/product.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.utils.js";

const createProduct= async(req,res)=>{
    try{
        const {name, price, category}= req.body;
        if(!name || !price || !category){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        const imagelocalpath= req.file?.path
        if(!imagelocalpath){
            return res.status(400).json({
                success: false,
                message: "Image is required"
            })
        }
        const response= await uploadOnCloudinary(imagelocalpath)
        if(!response){
            throw new Error("Image failed to upload on cloudinary")
        }
        const product = await Product.create({
            image: response.url,
            name,
            price,
            category
        })
        if(!product){
            throw new Error("Product failed to add in database")
        }
        return res.status(200).json({
            success: true,
            message: "Product is added successfully",
            data: product
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

const getProducts= async(req,res)=>{
    try{
        const products= await Product.find()
        return res.status(200).json({
            success: true,
            data: products
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateProduct= async(req,res)=>{
    try{
        const id= req.params.id;
        const product= await Product.findById(id)
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product with this id does not exist"
            })
        }
        if(req.file){
            const response= await uploadOnCloudinary(req.file.path);
            if(!response){
                throw new Error("Image failed to upload on cloudinary")
            }
            product.image= response.url
        }
        const {name, price, category}= req.body
        product.name= name;
        product.price= price;
        product.category= category
        await product.save()
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteProduct = async(req,res)=>{
    try{
        const id= req.params.id
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product with this id does not exist"
            })
        }
        await product.deleteOne()
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete product"
        })
    }
}
export {createProduct, getProducts, updateProduct, deleteProduct}