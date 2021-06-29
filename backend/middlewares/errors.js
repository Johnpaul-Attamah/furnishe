import ErrorHandler from './../utils/errorHandler';

export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    if(process.env.NODE_ENV==='development') {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV==='production') {
        let error = { ...err };
        error.message = err.message;

        //wrong mongoose objectId error
        if(err.name === 'CastError') {
            const message = `Resource not found. Invalid ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        //validation errors
        if(err.name === 'validationError') {
            const message = Object.values(err.errors).map( value => value.message);
            error = new ErrorHandler(message, 400);
        }
        
        //Mongoose Duplicate key errors
        if(err.code === 11000) {
            const message = `${Object.keys(err.keyValue)} exists`;
            error = new ErrorHandler(message, 400);
        }

        //Wrong Jwt error
        if(err.name === 'JsonWebTokenError') {
            const message = `Invalid Token!!`;
            error = new ErrorHandler(message, 400);
        }

        //Expired Jwt error
        if(err.name === 'TokenExpiredError') {
            const message = 'Token expired. login to continue...'
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}