import mongoose from 'mongoose';
import { DB_NAME, MONGODB_CONNECTION_URI } from './../configs/config.js';

const options = {
    dbName: DB_NAME,
};

const connectDb = async () => {


    try {
        const connString = MONGODB_CONNECTION_URI
        if (!connString) {
            throw new Error("DB Connection String is not fount 😓")
        }

        const connect = await mongoose.connect(connString, options)
        console.log(`
        Connected to DB 👍
        DB_HOST: ${connect.connection.host}
        DB_PORT: ${connect.connection.port}
        DB_Name: ${connect.connection.name}
        `);

    } catch (error) {
        console.error("Error connecting the DB 💀💀💀")
    }
}

export default connectDb;