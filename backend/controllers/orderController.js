import Order from "../models/Order";
import Product from "../models/Product";
import ErrorHandler from './../utils/errorHandler';
import catchAsyncErrors from "../middlewares/catchAsyncErrors";



/**
 * create new order
 * @async route => /api/v1/order/new
 * @function newOrder
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the order data
 */
export const newOrder = catchAsyncErrors(async(req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.status(200).json({
        success: true,
        order
    })
})

/**
 * Get order by id
 * Admin route
 * @async route => /api/v1/orders/:id
 * @function getSingleOrder
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the order data
 */
export const getSingleOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email');

    if(!order)
        return next(
            new ErrorHandler(`order with id ${req.params.id} not found`, 404)
        )

    res.status(200).json({
        success: true,
        order
    })    
})

/**
 * Get logged in user orders
 * protected route
 * @async route => /api/v1/orders/me
 * @function myOrders
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the order data
 */
export const myOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    res.status(200).json({
        success: true,
        orders
    })
})

/**
 * Get all orders
 * admin route
 * @async route => /api/v1/admin/orders
 * @function myOrders
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the order data
 */
export const allOrders = catchAsyncErrors(async(req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order => totalAmount += order.totalPrice);

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

/**
 * update orders
 * Admin route
 * @async route => /api/v1/orders/:id
 * @function myOrders
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the order data
 */
export const updateOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(order.orderStatus === 'Delivered') 
        return next(
            new ErrorHandler('You have already delivered this order', 400)
        )

    order.orderItems.forEach(async item => 
        await updateStock(item.product, item.quantity))

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true
    })
})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;

    await product.save();
}

/**
 * delete orders
 * Admin route
 * @async route => /api/v1/orders/:id
 * @function deleteOrders
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} delete message
 */
export const deleteOrder = catchAsyncErrors(async(req, res, next) => {
    const order = await Order.findById(req.params.id);
    if(!order)
        return next(
            new ErrorHandler(`No data found with id ${req.params.id}`)
        )

    await order.remove();
    res.status(200).json({
        success: true
    })    
})