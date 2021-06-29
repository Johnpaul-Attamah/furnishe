import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
        maxlength: [30, 'Your name cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
        unique: true,
        validate: [validator.isEmail, 'Invalid Email Address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be longer than 6 characters'],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})
/**
 * Encrypt password before saving to database
 * @async
 * @function
 * @param {object} next
 */
UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})


/**
 * check password match
 * @method comparePassword
 */
UserSchema.methods.comparePassword = async function(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password)
}

/**
 * Generate token for Jwt
 * @method getJwtToken
 */
UserSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

/**
 * generatepassword reset token
 * @method getResetPasswordToken
 */
UserSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256')
        .update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}


export default mongoose.model('User', UserSchema);

