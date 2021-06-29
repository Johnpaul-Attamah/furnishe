import cloudinary from "cloudinary";
import Product from "../models/Product";
import APIFeatures from './../utils/apiFeatures';
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import ErrorHandler from "../utils/errorHandler";

/**
 * create new Product
 * @async route => /api/v1/product/new
 * @function newProduct
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */
export const newProduct = catchAsyncErrors(async(req, res, next) => {

    let images = [];
    if(typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    let imagesLinks = [];

    for(let i = 0; i< images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'furnishe/products'
        });
        imagesLinks.push({
            publicId: result.public_id,
            url: result.secure_url
        })
    }

    req.body.images = imagesLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
})

/**
 * Get all Products
 * Get menu
 * Public route
 * @async route => /api/v1/products
 * @function getProducts
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */
export const getProducts = catchAsyncErrors(async(req, res, next) => {
    const resPerPage = 4;
    const productsCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await apiFeatures.query;
    let filteredProductsCount = products.length;
    apiFeatures.pagination(resPerPage);

    products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        productsCount,
        resPerPage,
        filteredProductsCount,
        products
    })
})


/**
 * Get all Products admin route
 * Get menu
 * Private route
 * @async route => /api/v1/admin/products
 * @function getAdminProducts
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */
export const getAdminProducts = catchAsyncErrors(async(req, res, next) => {

    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
})

/**
 * Get product by id
 * Public route
 * @async route => /api/v1/products/:id
 * @function getSingleProduct
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */
export const getSingleProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if(!product)
        return next(
            new ErrorHandler(`product with id ${req.params.id} not found`)
        )
    res.status(200).json({
        success: true,
        product
    })
})

/**
 * update product details
 * Admin route
 * @async route => /api/v1/product/:id
 * @function updateProduct
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */
export const updateProduct = catchAsyncErrors(async(req, res, next) => {
    let product = await Product.findById(req.params.id);
    if(!product) 
        return next(new ErrorHandler('product not found', 404))

    let images = [];
    if(typeof req.body.images === 'string') {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    if (images !== undefined) {
        for(let i = 0; i < product.images.length; i++) {
            const result = await cloudinary.v2.uploader.destroy(product.images[i].publicId)
        }

        let imagesLinks = [];

        for(let i = 0; i< images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: 'furnishe/products'
            });
            imagesLinks.push({
                publicId: result.public_id,
                url: result.secure_url
            })
        }

        req.body.images = imagesLinks;
    }
    
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: "true",
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        product
    });
})

/**
 * Delete product
 * Admin route
 * @async route => /api/v1/product/:id
 * @function deleteProduct
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the message
 */
export const deleteProduct = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) 
        return next(
            new ErrorHandler(`Product with id ${req.params.id} not found`)
        )

    for(let i = 0; i < product.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(product.images[i].publicId)
    }
    await product.remove();
    res.status(200).json({
        success: true,
        message: 'Product deleted'
    })
})

/**
 * create new product Review
 * @async route => /api/v1/review
 * @function createProductReview
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */
export const createProductReview = catchAsyncErrors(async(req, res, next) => {
    const { rating, comment, productId } = req.body;

    const userReview = {
        user: req.user._id,
        name: req.user.name,
        rating,
        comment
    }

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed) {
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()) {
                review.comment = userReview.comment;
                review.rating = userReview.rating;
            } 
        })

    } else {
        product.reviews.push(userReview);
        product.numOfReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })

})

/**
 * get all reviews of a product
 * @async route => /api/v1/review
 * @function getProductReview
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */
export const getProductReview = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.query.id);
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

/**
 * delete a product review
 * @async route => /api/v1/review
 * @function deleteProductReview
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the product data
 */
export const deleteProductReview = catchAsyncErrors(async(req, res, next) => {
    const product = await Product.findById(req.query.productId);

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString());

    const ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0)/reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})