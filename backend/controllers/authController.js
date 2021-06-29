import crypto from 'crypto';
import cloudinary from 'cloudinary';
import User from './../models/User';
import ErrorHandler from './../utils/errorHandler';
import catchAsyncErrors from './../middlewares/catchAsyncErrors';
import sendToken from './../utils/jwtToken';
import sendEmail from './../utils/sendEmail';


/**
 * Register a User
 * @async route => /api/v1/register
 * @function registerUser
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
export const registerUser = catchAsyncErrors( async(req, res, next) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'furnishe/avatars',
        width: 150,
        crop: 'scale'
    })

    const { name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    })
    
    sendToken(user, 201, res);
})

/**
 * Login a User
 * Get the login details from the request body
 * check if email exists
 * check if password match
 * login user
 * @async route => /api/v1/login
 * @function loginUser
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
export const loginUser = catchAsyncErrors(async(req, res, next) => {

    const { email, password } = req.body;

    if(!email || !password) 
        return next(
            new ErrorHandler('Please Enter a valid Email and password', 400)
        );

    const user = await User.findOne({email}).select('+password');

    if(!user) return next(new ErrorHandler('Invalid Email or password', 401));
    
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched)
        return next(
            new ErrorHandler('Invalid Email or Password', 401)
        )

   sendToken(user, 200, res);
})

/**
 * Log out a user
 * @async route => /api/v1/logout
 * @function logOut
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} the user data
 */
export const logOut = catchAsyncErrors(async(req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'logged out'
    })
})

/**
 * Send password recovery email
 * check if input email exists
 * generate reset token and save in database
 * create reset password url for email
 * create message body for email
 * send the email
 * @async route => /api/v1/password/forgot
 * @function forgotPassword
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} email successfully sent
 */
export const forgotPassword = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user)
        return next(
            new ErrorHandler('user email not found', 404)
        )
    
    const resetToken =  user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your password reset token is as follows: \n\n${resetUrl}\n\n if you have not requested this email, please ignore it.`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'furnishe password recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500))
    }
})

/**
 * Reset password
 * hash URI token
 * find the reset password token in the database and check if expired 
 * compare password in the request body
 * setup new password
 * send jwt token
 * @async route => /api/v1/password/reset/:token
 * @function resetPassword
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 * @return {Promise<json>} email successfully sent
 */
export const resetPassword = catchAsyncErrors(async(req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256')
        .update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt:  Date.now() }
    });

    if(!user)
        return next(
            new ErrorHandler('Password reset token is invalid or expired', 400)
        )

    if(req.body.password !== req.body.confirmPassword) 
        return next(
            new ErrorHandler('passwords does not match', 400)
        )

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();
    sendToken(user, 200, res);

})