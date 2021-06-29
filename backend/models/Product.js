import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, 'please enter a product name'],
        trim: true,
        unique: true,
        maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxlength: [5, 'Product price cannot exceed 5 characters'],
        default: 0.0
    },
    description: {
        type:String,
        required: [true, 'Please enter product description']
    },
    productLength: {
        type: Number,
        required: [true, 'Please enter product lenght']
    },
    productBredth: {
        type: Number,
        required: [true, 'Please enter product width']
    },
    productHeight: {
        type: Number,
        required: [true, 'Please enter product height']
    },
    style: {
        type: String,
        required: true
    },
    features: [
        {
            type: String,
            required: true
        }
    ],
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            publicId: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true, 'Please Select Category for this product'],
        enum: {
            values: [
                'chairs',
                'storage',
                'accessories',
                'tables',
                'office',
                'kitchen',
                'sofas',
                'cushion',
                'bedroom',
                'dinning',
                'bathroom'
            ],
            message: 'Please select any of the category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxlength: [5, 'product stock cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Product', ProductSchema);