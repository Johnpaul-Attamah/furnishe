import cloudinary from 'cloudinary';
import User from './../models/User';
import ErrorHandler from './../utils/errorHandler';
import catchAsyncErrors from './../middlewares/catchAsyncErrors';
import sendToken from './../utils/jwtToken';

/**
 * Get Loggedin user details/profile
 * @async route => /api/v1/me
 * @function getUserProfile
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
export const getUserProfile= catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success: true,
        user
    })
})


/**
 * Update password of logged in user
 * get user by id
 * check previous user password
 * @async route => /api/v1/password/update
 * @function updatePassword
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
export const updatePassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    const isMatched = await user.comparePassword(req.body.oldPassword);

    if(!isMatched)
        return next (
            new ErrorHandler('password is incorrect', 400)
        )
        
    user.password = req.body.password;

    await user.save();
    
    sendToken(user, 200, res);
})

/**
 * Update profile of logged in user
 * get user from input
 * find user by id and update data
 * @async route => /api/v1/me/update
 * @function updateProfile
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
export const updateProfile = catchAsyncErrors(async(req, res, next) =>{
    const newUser = {
        name: req.body.name,
        email: req.body.email
    }
    /** Update avatar*/
    if(req.body.avatar !== '') {
        const user = await User.findById(req.user.id);

        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'furnishe/avatars',
            width: 150,
            crop: 'scale'
        })

        newUser.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    
    const user = await User.findByIdAndUpdate(req.user.id, newUser, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })
})

/**
 *#################################################################
 *#################################################################
 ***********************ADMIN Routes*******************************
 *#################################################################
 *#################################################################
 */
/**
 * GET ALL USERS
 * @async route => /api/v1/admin/users
 * @function allUsers
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
export const allUsers = catchAsyncErrors(async(req, res, next) => {
    const users = await User.find();
    if(!users)
        return next(
            new ErrorHandler('No users yet', 404)
        )
    res.status(200).json({
        success: true,
        users
    })
})

/**
 * GET A USER DETAIL
 * @async route => /api/v1/admin/user/:id
 * @function getUserDetails
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
export const getUserDetails = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user) 
        return next(
            new ErrorHandler(`user not found with id ${req.params.id}`, 404)
        )
    
    res.status(200).json({
        success: true,
        user
    })
})

/**
 * Update user
 * @async route => /api/v1/admin/user/:id
 * @function updateUser
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
export const updateUser = catchAsyncErrors(async(req, res, next) => {
    const newUserData= {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true
    })
})

/**
 * DELETE A USER
 * @async route => /api/v1/admin/user/:id
 * @function deleteUser
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
export const deleteUser = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);
    if(!user)
        return next(
            new ErrorHandler(`user with id ${req.param.id} not found`, 404)
        )
    //Remove avatar
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();
    res.status(200).json({
        success: true
    })
})