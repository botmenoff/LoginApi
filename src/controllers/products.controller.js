import Product from '../models/products.js'

export const createProduct = async (req,res) => {
    const {name,category,price,imgURL}= req.body
    const newProduct = new Product({name,category,price,imgURL}) 
    const productSave = await newProduct.save()
    console.log(newProduct);
    res.status(201).json(productSave)
}

export const getProducts = async (req,res) => {
    const products = await Product.find()
    res.status(200).json(products)
}

export const getProductById = async (req,res) => {
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)
}

export const updateProductById = async (req,res) => {
    const updatedproduct = await Product.findByIdAndUpdate(req.params.productId, req.body, {
        new: true
    })
    res.status(200).json(updatedproduct)
}

export const deleteProductById = async (req,res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId)
    res.status(200).json(deletedProduct)
}