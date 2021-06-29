import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import app from './app';
import connectDatabase from './config/database';

process.on('uncaughtException', err => {
    console.log(`Error: ${err.message}`);
    console.log('Uncaught exception, shutting down server.');
    process.exit(1);
})

if(process.env.NODE_ENV !== 'production'){
    dotenv.config({ path: 'backend/config/config.env' });
}
connectDatabase();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


const server = app.listen(process.env.PORT, () => 
    console.log(`Server started at: http://127.0.0.1:${process.env.PORT} in ${process.env.NODE_ENV} mode
    `));

process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('shutting down server');
    server.close(() => {
        process.exit(1);
    })
})
