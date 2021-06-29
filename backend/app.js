import express from 'express';
import dotenv from ''dotenv;
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import path from 'path';
import auth from './routes/auth';
import payment from './routes/payment';
import profile from './routes/profile';
import product from './routes/product';
import order from './routes/order';
import errorMiddleware from './middlewares/errors';

const app = express();

if(process.env.NODE_ENV !== 'production'){
    dotenv.config({ path: 'backend/config/config.env' });
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());


app.use('/api/v1', auth);
app.use('/api/v1', profile);
app.use('/api/v1', product);
app.use('/api/v1', order);
app.use('/api/v1', payment);


if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/build/index.html'))
    })
}
app.use(errorMiddleware);


export default app;