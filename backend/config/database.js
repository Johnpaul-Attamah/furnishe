import mongoose from 'mongoose';

let database_domain;

if(process.env.NODE_ENV === 'development') {
    database_domain = process.env.DB_LOCAL_URI;
}
if(process.env.NODE_ENV === 'production') {
    database_domain = process.env.DB_URI;
}



const connectDatabase = () => {
    mongoose.connect(database_domain, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`Mongodb Database connected with Host: ${con.connection.host}`)
    })
}

export default connectDatabase;